"use client";

import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function HomeContent() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Podcast Platform
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          component={Link}
          href="/episodes/1"
        >
          View Episode
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href="/profile/1"
        >
          View Profile
        </Button>
      </Box>
    </Box>
  );
}