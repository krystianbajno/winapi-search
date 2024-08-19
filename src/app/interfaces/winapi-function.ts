import { Syscall } from "./winapi-syscall"

export interface IWinApiDllFunction {
    function_name: string,
    function_link?: string,
    ret_type: string,
    params: string[]
    syscalls: Syscall[]
}