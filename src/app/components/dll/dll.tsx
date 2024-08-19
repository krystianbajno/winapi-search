import React, { useState, useEffect, Suspense } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import Function from '@/app/components/function/function';
import styles from "@/app/components/dll/dll.module.scss";
import { useInfiniteScroll } from '@/app/hooks/use-infinite-scroll';

interface DllProps {
  dll: IWinApiDll;
  showContents: boolean;
}

const ITEMS_PER_PAGE = 32;
const Dll: React.FC<DllProps> = ({ dll, showContents }) => {
  const [isContentVisible, setIsContentVisible] = useState(showContents);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsContentVisible(showContents);
  }, [showContents]);

  const toggleContents = () => {
    setIsContentVisible(prevState => !prevState);
  };

  const observerRef = useInfiniteScroll({
    onIntersect: () => setPage(prevPage => prevPage + 1),
  });


  return (
    <div className={styles.dllSection}>
      <h2 className={styles.dllModuleName} onClick={toggleContents}>
        ({dll.functions?.length}) {dll.module_name}
      </h2>
      {isContentVisible && (
        <ul>
          {dll.functions.map((fn, index) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Function key={`${fn.function_name}-${index}`} fn={fn} />
            </Suspense>
          )).slice(0, page * ITEMS_PER_PAGE)}
          <div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />
        </ul>
      )}
    </div>
  );
};

export default Dll;
