import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const undocumentedApiResponse = await axios.get(process.env.UNDOCUMENTED_WINAPI_DATA_URL!);

    const undocumentedDlls = undocumentedApiResponse.data?.modules;

    return NextResponse.json(undocumentedDlls);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
  }
}
