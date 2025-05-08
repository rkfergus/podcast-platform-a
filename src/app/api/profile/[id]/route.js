import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
  const { id } = params;
  const profiles = [
    {
      id: '1',
      name: 'John Podcaster',
      bio: 'Host of multiple tech and lifestyle podcasts with over 10k listeners.',
      shows: [
        { title: 'Tech Talk', episodes: 25 },
        { title: 'Life Hacks', episodes: 18 },
      ],
    },
  ];
  const profile = profiles.find((p) => p.id === id) || profiles[0];
  return NextResponse.json(profile);
}