import { useEffect, useState, useMemo } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import { Dlls } from '@/app/logic/api/winapi';
import { search } from '@/app/logic/search';

export const useWinApiSearch = (searchTerm: string = '', showSyscalls: boolean = false, itemsPerPage: number = 8) => {
  const [dlls, setDlls] = useState<IWinApiDll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDlls = async () => {
      try {
        const data = await Dlls.get();
        setDlls(data);
      } catch (error) {
        setError("Failed to fetch DLLs");
        console.error("Error fetching DLLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDlls();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, showSyscalls]);

  const filteredDlls = useMemo(() => {
    const results = search(searchTerm, showSyscalls, dlls);
    return results
      .sort((a, b) => b.functions.length - a.functions.length)
      .slice(0, page * itemsPerPage);
  }, [searchTerm, showSyscalls, dlls, page, itemsPerPage]);

  return {
    dlls,
    filteredDlls,
    loading,
    error,
    setPage,
  };
};
