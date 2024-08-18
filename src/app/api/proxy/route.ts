import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const documentedApiResponse = await axios.get(process.env.WINAPI_DATA_URL!);
    const undocumentedApiResponse = await axios.get(process.env.UNDOCUMENTED_WINAPI_DATA_URL!);

    const documentedDlls = documentedApiResponse.data;
    const undocumentedDlls = undocumentedApiResponse.data;

    const mergedResponse = [...documentedDlls];

    undocumentedDlls.forEach(undocumentedDll => {
      const existingDll = mergedResponse.find(dll => dll.module_name === undocumentedDll.module_name);

      if (existingDll) {
        undocumentedDll.functions.forEach(fn => {
          if (!existingDll.functions.some(docFn => docFn.function_name === fn.function_name)) {
            existingDll.functions.push(fn);
          }
        });
      } else {
        mergedResponse.push(undocumentedDll);
      }
    });

    return NextResponse.json(mergedResponse);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
  }
}
