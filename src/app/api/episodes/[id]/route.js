import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
  const { id } = params;
  const episodes = [
    {
      id: '1',
      title: 'Episode 1: Getting Started',
      podcast: 'Tech Talk',
      date: '2023-10-01',
      audioUrl: 'https://example.com/audio.mp3',
      showNotes:
        'In this episode, we discuss the basics of podcasting and tech trends for 2023.',
    },
  ];
  const episode = episodes.find((e) => e.id === id) || episodes[0];
  return NextResponse.json(episode);
}