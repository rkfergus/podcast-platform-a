import { NextResponse } from 'next/server';


export async function GET(request) {
  const analytics = [
    { month: 'Jan', listeners: 1200 },
    { month: 'Feb', listeners: 1500 },
    { month: 'Mar', listeners: 1800 },
    { month: 'Apr', listeners: 2000 },
    { month: 'May', listeners: 2200 },
  ];
  return NextResponse.json(analytics);
}