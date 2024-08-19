import { IWinApiDll } from '@/app/interfaces/winapi-dll';

export const matchToken = (token: string, target: string): boolean => {
  return target.toLowerCase().includes(token.toLowerCase());
};

export const scoreAndRankResults = (dlls: IWinApiDll[], searchTokens: string[]): IWinApiDll[] => {
  return dlls.map(dll => {
    const dllNameMatches = searchTokens.some(token => matchToken(token, dll.module_name));
    let functionMatchesCount = 0;

    const matchingFunctions = dll.functions.map(fn => {
      const matchingSyscalls = fn.syscalls.filter(syscall =>
        searchTokens.some(token =>
          matchToken(token, syscall.architecture) ||
          matchToken(token, syscall.module_type) ||
          matchToken(token, syscall.os_version) ||
          matchToken(token, syscall.service_pack) ||
          syscall.syscall_number.toString() === token ||           // Full match for decimal syscall_number
          syscall.syscall_number.toString(16) === token.toLowerCase() // Full match for hexadecimal syscall_number
        )
      );

      const functionMatches = searchTokens.some(token =>
        matchToken(token, fn.function_name) ||
        matchToken(token, fn.ret_type) ||
        fn.params.some(param => matchToken(token, param)) ||
        matchingSyscalls.length > 0
      );

      if (functionMatches) {
        functionMatchesCount++;
        return {
          ...fn,
          syscalls: matchingSyscalls // Only include matching syscalls
        };
      }

      return null;
    }).filter(fn => fn !== null); // Filter out null values

    if (matchingFunctions.length > 0 || dllNameMatches) {
      return {
        ...dll,
        functions: matchingFunctions,
        score: functionMatchesCount,
      };
    }

    return null;
  }).filter(dll => dll !== null) // Filter out null values
    .sort((a, b) => (b as any).score - (a as any).score);
};

export const determineSearchContext = (searchTokens: string[]): { dllName: string, functionName: string } => {
  const dllName = searchTokens.find(token => matchToken('dll', token)) || '';
  const functionName = searchTokens.find(token => !matchToken('dll', token)) || '';
  return { dllName, functionName };
};
