# WinAPI Search

## Overview

**WinAPI Search** helps you find functions in WinAPI DLLs. You can search by DLL name, function name, return type, and parameters, with results showing matches for all your search terms.

## Features

- **AND Search**: All search terms must match.
- **Searchable Fields**:
  - DLL Name
  - Function Name
  - Return Type
  - Parameters

## Collection
This project works together with the [winapi_to_json](https://github.com/Artideusz/winapi_to_json) tool by **Artideusz**, which collects and formats WinAPI DLL metadata and exposes it as a daily refreshed endpoint. It gathers function metadata from Microsoft’s official repository [win32metadata](https://github.com/microsoft/win32metadata) and Rust [symbol bindings](https://github.com/microsoft/windows-rs/raw/master/crates/libs/bindgen/default/Windows.Win32.winmd) and makes them accessible through a refreshed GitHub release.

For undocumented API's, I've created a collector that works like `winapi_to_json`, but uses various sources - [undocumented-winapi-json](https://github.com/krystianbajno/undocumented-winapi-json).

## Credits
- **Krystian Bajno** - winapi-search, [undocumented-winapi-json](https://github.com/krystianbajno/undocumented-winapi-json)
- **Artideusz** - [winapi_to_json](https://github.com/Artideusz/winapi_to_json)
