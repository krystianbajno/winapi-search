import { IWinApiDllFunction } from "./winapi-function";


export interface IWinApiDll {
    module_name: string,
    functions: IWinApiDllFunction[];
}
