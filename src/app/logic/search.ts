import { IWinApiDll } from '@/app/interfaces/winapi-dll';

export const matchToken = (token: string, target: string): boolean => {
  return target.toLowerCase().includes(token.toLowerCase());
};

export const scoreAndRankResults = (dlls: IWinApiDll[], searchTokens: string[]): IWinApiDll[] => {
  return dlls.map(dll => {
    const dllNameMatches = searchTokens.some(token => matchToken(token, dll.module_name));
    let functionMatchesCount = 0;

    const matchingFunctions = dll.functions.filter(fn => {
      const functionMatches = searchTokens.some(token =>
        matchToken(token, fn.function_name) ||
        matchToken(token, fn.ret_type) ||
        fn.params.some(param => matchToken(token, param))
      );
      if (functionMatches) functionMatchesCount++;
      return functionMatches;
    });

    if (matchingFunctions.length > 0 || dllNameMatches) {
      return {
        ...dll,
        functions: matchingFunctions.length > 0 ? matchingFunctions : dll.functions,
        score: functionMatchesCount
      };
    }

    return null;
  }).filter(dll => dll !== null)
    .sort((a, b) => (b as any).score - (a as any).score);
};

export const determineSearchContext = (searchTokens: string[]): { dllName: string, functionName: string } => {
  const dllName = searchTokens.find(token => matchToken('dll', token)) || '';
  const functionName = searchTokens.find(token => !matchToken('dll', token)) || '';
  return { dllName, functionName };
};
