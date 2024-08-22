import { NextRequest, NextResponse } from 'next/server';

// link shortener
export async function GET(request: NextRequest) {
  try {
    return Response.redirect("https://github.com/microsoft/windows-rs/tree/master/crates/libs/bindgen/default")
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
  }
}
