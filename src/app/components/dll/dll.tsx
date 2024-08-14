import React from 'react';
import { IWinApiDll } from '../../interfaces/winapi-dll';
import Function from '../function/function';
import styles from "./dll.module.scss";

interface DllProps {
  dll: IWinApiDll;
  showContents: boolean;
}

const Dll: React.FC<DllProps> = ({ dll, showContents }) => (
  <div className={styles.dllSection}>
    <h2 className={styles.dllModuleName}>{dll.module_name}</h2>
    {showContents && <ul>
      {dll.functions.map((fn, index) => (
        <Function key={`${fn.function_name}-${index}`} fn={fn} />
      ))}
    </ul>}
  </div>
);

export default Dll;
