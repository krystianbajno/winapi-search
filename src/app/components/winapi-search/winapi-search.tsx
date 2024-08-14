import React, { useEffect } from 'react';
import WinApiGrid from '../../components/grid/grid';
import { useWinApiSearch } from '../../hooks/use-winapi-search';
import { useSearch } from '@/app/context/search-context';

interface WinApiSearchProps {
  showContents: boolean;
}

const WinApiSearch: React.FC<WinApiSearchProps> = ({ showContents }) => {
  const { searchTerm } = useSearch();
  const { filteredDlls, loading, error, observerRef, initializeObserver } = useWinApiSearch(searchTerm);

  // Re-trigger the observer when showContents changes
  useEffect(() => {
    initializeObserver();
  }, [showContents, initializeObserver]);

  if (loading && filteredDlls.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {filteredDlls.length > 0 ? (
        <>
          <WinApiGrid dlls={filteredDlls} showContents={showContents} />
          <div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />
        </>
      ) : (
        <p>No DLLs found.</p>
      )}
    </>
  );
};

export default WinApiSearch;
