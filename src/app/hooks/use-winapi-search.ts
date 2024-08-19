import { useEffect, useState } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import { Dlls } from '@/app/logic/api/winapi';
import { search } from '@/app/logic/search';

export const useWinApiSearch = (searchTerm: string = '', showSyscalls: boolean = false, itemsPerPage: number = 8) => {
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
  }, [searchTerm, showSyscalls]);


  useEffect(() => {
    const results = search(searchTerm, showSyscalls, dlls)
    const sortedResults = results.sort((a, b) => b.functions.length - a.functions.length);
    setFilteredDlls(sortedResults.slice(0, page * itemsPerPage));
  }, [searchTerm, dlls, page, itemsPerPage, showSyscalls]);

  return {
    dlls,
    filteredDlls,
    loading,
    error,
    setPage,
  };
};
