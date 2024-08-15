import { useEffect, useState } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import { Dlls } from '@/app/logic/api/winapi';

export const useWinApiSearch = (searchTerm: string = '', itemsPerPage: number = 8) => {
  const [dlls, setDlls] = useState<IWinApiDll[]>([]);
  const [filteredDlls, setFilteredDlls] = useState<IWinApiDll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDlls = async () => {
      try {
        const data = await Dlls.get();
        setDlls(data);
        setFilteredDlls(data.slice(0, itemsPerPage));
      } catch (error) {
        setError("Failed to fetch DLLs");
        console.error("Error fetching DLLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDlls();
  }, [itemsPerPage]);

  useEffect(() => {
    if (!dlls.length) return;

    const normalizedSearchTerm = searchTerm.toLowerCase();
    const searchTokens = normalizedSearchTerm.split(' ').filter(token => token);

    const filtered = dlls.map(dll => {
      const dllNameMatches = searchTokens.some(token =>
        dll.module_name.toLowerCase().includes(token)
      );

      const matchingFunctions = dll.functions.filter(fn => {
        return searchTokens.some(token =>
          fn.function_name.toLowerCase().includes(token) ||
          fn.ret_type.toLowerCase().includes(token) ||
          fn.params.some(param => param.toLowerCase().includes(token))
        );
      });

      const allTokensMatch = searchTokens.every(token =>
        dll.module_name.toLowerCase().includes(token) ||
        matchingFunctions.some(fn =>
          fn.function_name.toLowerCase().includes(token) ||
          fn.ret_type.toLowerCase().includes(token) ||
          fn.params.some(param => param.toLowerCase().includes(token))
        )
      );

      if (allTokensMatch || searchTerm === '') {
        return {
          ...dll,
          functions: matchingFunctions.length > 0 ? matchingFunctions : dll.functions,
        };
      } else if (dllNameMatches) {
        return {
          ...dll,
          functions: dll.functions,
        };
      } else {
        return null;
      }
    }).filter(dll => dll !== null) as IWinApiDll[];

    setFilteredDlls(filtered.slice(0, page * itemsPerPage));
  }, [searchTerm, dlls, page, itemsPerPage]);

  return {
    dlls,
    filteredDlls,
    loading,
    error,
    setPage,
  };
};
