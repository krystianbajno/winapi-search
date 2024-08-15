import { IWinApiDllFunction } from "@/app/interfaces/winapi-function";


export interface IWinApiDll {
    module_name: string,
    functions: IWinApiDllFunction[];
}
