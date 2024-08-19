import React, { Suspense } from 'react';
import { IWinApiDll } from '@/app/interfaces/winapi-dll';
import Dll from '@/app/components/dll/dll';
import styles from '@/app/components/grid/grid.module.scss';

interface GridProps {
  dlls: IWinApiDll[];
  showContents: boolean;
}

const Grid: React.FC<GridProps> = ({ dlls, showContents }) => (
  <div className={styles.gridContainer}>
    {dlls.map(dll => (
      <div key={dll.module_name} className={styles.dllItem}>
        <Suspense fallback={<div>Loading...</div>}>
            <Dll showContents={showContents} dll={dll} />
        </Suspense>
      </div>
    ))}
  </div>
);

export default Grid;
