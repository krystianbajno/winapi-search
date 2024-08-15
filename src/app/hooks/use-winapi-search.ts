import { useEffect, useState } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import { Dlls } from '@/app/logic/api/winapi';
import { matchToken, scoreAndRankResults, determineSearchContext } from '@/app/logic/search';

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
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!dlls.length) return;

    const normalizedSearchTerm = searchTerm.toLowerCase();
    const searchTokens = normalizedSearchTerm.split(' ').filter(token => token);

    if (!searchTokens.length) {
      setFilteredDlls(dlls.slice(0, page * itemsPerPage));
      return;
    }

    const { dllName, functionName } = determineSearchContext(searchTokens);

    const filteredResults = scoreAndRankResults(dlls, searchTokens);

    const results = (dllName && functionName) 
      ? filteredResults.filter(dll => matchToken(dllName, dll.module_name))
      : filteredResults;

    setFilteredDlls(results.slice(0, page * itemsPerPage));
  }, [searchTerm, dlls, page, itemsPerPage]);

  return {
    dlls,
    filteredDlls,
    loading,
    error,
    setPage,
  };
};
