import React from 'react';
import { IWinApiDllFunction } from '@/app/interfaces/winapi-function';
import styles from "@/app/components/function/function.module.scss";

interface FunctionProps {
  fn: IWinApiDllFunction;
}


const Function: React.FC<FunctionProps> = ({ fn }) => (
  <li className={styles.function}>
    { fn.function_link ?
      <strong><a className={styles.functionLink + (fn.syscalls.length > 0 ? ` ${styles.isSyscall}` : "")} href={fn.function_link}>{fn.function_name}</a></strong>
      : <strong>{fn.function_name}</strong>
    }:  {fn.ret_type}
    <ul>
      {fn.params.map((param, index) => (
        <li key={`${param}-${index}`}>{param}</li>
      ))}
    </ul>
    {fn.syscalls.length > 0 && <details className={styles.syscalls}>
      <summary>Syscalls</summary>
      {
        fn.syscalls.map((syscall, index) => {
          
          return <div key={`${syscall.syscall_number}-${index}`} className={styles.syscall}>
            <div className={styles.hexNumber}>
              0x{syscall.syscall_number.toString(16)}
            </div>
            <div className={styles.decimalNumber}>
              {syscall.syscall_number}
            </div>
            <div className={styles.moduleType}>
              {syscall.module_type}
            </div>
            <div className={`${styles.architecture} ${styles[syscall.architecture]}`}>
              {syscall.architecture}
            </div>
            <div>
              {syscall.os_version} 
            </div>
            <div>
              {syscall.service_pack} 
            </div>
          </div>
        })
      }
    </details>}
  </li>
);

export default Function;
