import React, { useState, useEffect, Suspense } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import Function from '@/app/components/function/function';
import styles from "@/app/components/dll/dll.module.scss";

interface DllProps {
  dll: IWinApiDll;
  showContents: boolean;
}

const Dll: React.FC<DllProps> = ({ dll, showContents }) => {
  const [isContentVisible, setIsContentVisible] = useState(showContents);

  useEffect(() => {
    setIsContentVisible(showContents);
  }, [showContents]);

  const toggleContents = () => {
    setIsContentVisible(prevState => !prevState);
  };

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
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dll;
