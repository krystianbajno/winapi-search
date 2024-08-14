import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// [
//   {
//     "module_name": "DirectML.dll",
//     "functions": [
//       {
//         "function_name": "DMLCreateDevice",
//         "ret_type": "HResult",
//         "params": [
//           "ID3D12Device d3d12Device",
//           "DML_CREATE_DEVICE_FLAGS flags",
//           "*Guid riid",
//           "*Void ppv"
//         ]
//       },
//       {
//         "function_name": "DMLCreateDevice1",
//         "ret_type": "HResult",
//         "params": [
//           "ID3D12Device d3d12Device",
//           "DML_CREATE_DEVICE_FLAGS flags",
//           "DML_FEATURE_LEVEL minimumFeatureLevel",
//           "*Guid riid",
//           "*Void ppv"
//         ]
//       }
//     ]
//   },


export async function GET(request: NextRequest) {
  try {
    const apiResponse = await axios.get(process.env.WINAPI_DATA_URL!);
    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
  }
}
