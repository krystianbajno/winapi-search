import React from 'react';
import { IWinApiDll } from '../../interfaces/winapi-dll';
import Dll from '../dll/dll';
import styles from './grid.module.scss';

interface GridProps {
  dlls: IWinApiDll[];
  showContents: boolean;
}

const Grid: React.FC<GridProps> = ({ dlls, showContents }) => (
  <div className={styles.gridContainer}>
    {dlls.map(dll => (
      <div key={dll.module_name} className={styles.dllItem}>
        <Dll showContents={showContents} dll={dll} />
      </div>
    ))}
  </div>
);

export default Grid;
