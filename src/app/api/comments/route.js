import { NextResponse } from 'next/server';


let comments = [
  { episodeId: '1', content: 'Great episode!', user: 'User1', date: '2023-10-02' },
];


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const episodeId = searchParams.get('episodeId');
  return NextResponse.json(comments.filter((c) => c.episodeId === episodeId));
}


export async function POST(request) {
  const newComment = await request.json();
  newComment.user = 'CurrentUser';
  newComment.date = new Date().toISOString().split('T')[0];
  comments.push(newComment);
  return NextResponse.json(comments.filter((c) => c.episodeId === newComment.episodeId));
}