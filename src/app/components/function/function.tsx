import React from 'react';
import { IWinApiDllFunction } from '../../interfaces/winapi-function';
import styles from "./function.module.scss";

interface FunctionProps {
  fn: IWinApiDllFunction;
}

const Function: React.FC<FunctionProps> = ({ fn }) => (
  <li>
    <strong>{fn.function_name}</strong>: {fn.ret_type}
    <ul>
      {fn.params.map((param, index) => (
        <li key={`${param}-${index}`}>{param}</li>
      ))}
    </ul>
  </li>
);

export default Function;
