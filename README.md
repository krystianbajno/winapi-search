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

## Collaboration

This project works together with the [winapi_to_json](https://github.com/Artideusz/winapi_to_json) tool by **Artideusz**, which collects and formats WinAPI DLL data and exposes it as a daily refreshed endpoint.

### About winapi_to_json

Artideusz’s `winapi_to_json` gathers function data from Microsoft’s official repository and makes it accessible through an endpoint.

## Credits

- **Krystian Bajno** - WinAPI search frontend.
- **Artideusz** - WinAPI data collector and API ([winapi_to_json](https://github.com/Artideusz/winapi_to_json))
