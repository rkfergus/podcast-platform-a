'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';


export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState([]);


  useEffect(() => {
    // Fetch profile and analytics data
    fetch(`/api/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
    fetch(`/api/analytics?profileId=${id}`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, [id]);


  if (!profile) return <Layout>Loading...</Layout>;


  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {profile.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.bio}
        </Typography>
      </Box>


      <Divider sx={{ my: 4 }} />


      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Shows
          </Typography>
          <Paper sx={{ p: 2 }}>
            <List>
              {profile.shows.map((show, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={show.title}
                    secondary={`${show.episodes} Episodes`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      component={Link}
                      href={`/episodes/${index + 1}`}
                      size="small"
                    >
                      View
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>


        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Audience Analytics
          </Typography>
          <Paper sx={{ p: 2, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="listeners" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}