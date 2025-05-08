"use client";

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
              Podcast Platform
            </Link>
          </Typography>
          <Link href="/profile/1" style={{ color: 'white', marginRight: '16px' }}>
            Profile
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
}