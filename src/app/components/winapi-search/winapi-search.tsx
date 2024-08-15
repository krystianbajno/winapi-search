import React from 'react';
import WinApiGrid from '@/app/components/grid/grid';
import { useWinApiSearch } from '@/app/hooks/use-winapi-search';
import { useSearch } from '@/app/context/search-context';
import { useInfiniteScroll } from '@/app/hooks/use-infinite-scroll';

const WinApiSearch: React.FC = () => {
  const { searchTerm, showContents } = useSearch();
  const { filteredDlls, loading, error, setPage } = useWinApiSearch(searchTerm);

  const observerRef = useInfiniteScroll({
    onIntersect: () => setPage(prevPage => prevPage + 1),
  });

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
