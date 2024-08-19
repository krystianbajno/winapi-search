import { IWinApiDll } from '@/app/interfaces/winapi-dll';

export const matchToken = (token: string, target: string): boolean => {
  return target.toLowerCase().includes(token.toLowerCase());
};

export const search = (searchTerm: string, showSyscalls: boolean, dlls: IWinApiDll[]) => {
  const normalizedSearchTerm = searchTerm.toLowerCase();
  const searchTokens = normalizedSearchTerm.split(' ').filter(Boolean);

  let filteredResults = dlls;

  if (showSyscalls) {
    filteredResults = filteredResults
      .map(dll => ({
        ...dll,
        functions: dll.functions.filter(func => func.syscalls?.length)
      }))
      .filter(dll => dll.functions.length);
  }

  if (!searchTokens.length) return filteredResults;

  if (searchTokens.length === 1) {
    const matchingModule = filteredResults.filter(i =>
      i.module_name.toLowerCase().includes(searchTokens[0])
    );
    if (matchingModule.length) return matchingModule;
  }

  return dlls
    .map(dll => {
      let functionMatchesCount = 0;

      const matchingFunctions = dll.functions.map(fn => {
        const matchingSyscalls = fn.syscalls.filter(syscall =>
          searchTokens.some(token =>
            matchToken(token, syscall.architecture) ||
            matchToken(token, syscall.module_type) ||
            matchToken(token, syscall.os_version) ||
            matchToken(token, syscall.service_pack) ||
            syscall.syscall_number.toString() === token ||
            syscall.syscall_number.toString(16) === token.toLowerCase() ||
            matchToken(`0x${syscall.syscall_number.toString(16)}`, token)
          )
        );

        const functionMatches = searchTokens.some(token =>
          matchToken(token, fn.function_name) ||
          matchToken(token, fn.ret_type) ||
          fn.params.some(param => matchToken(token, param))
        );

        if (functionMatches || matchingSyscalls.length) {
          functionMatchesCount++;
          return {
            ...fn,
            syscalls: matchingSyscalls.length ? matchingSyscalls : fn.syscalls,
          };
        }

        return null;
      }).filter(Boolean);

      if (functionMatchesCount || searchTokens.some(token => matchToken(token, dll.module_name))) {
        return {
          ...dll,
          functions: matchingFunctions,
        };
      }

      return null;
    })
    .filter(Boolean)
};