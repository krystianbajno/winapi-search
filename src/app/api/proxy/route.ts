import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const apiResponse = await axios.get(process.env.WINAPI_DATA_URL!);
    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
  }
}
