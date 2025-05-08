'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import {
  Typography,
  Box,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';


export default function EpisodePage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    // Fetch episode data and comments
    fetch(`/api/episodes/${id}`)
      .then((res) => res.json())
      .then((data) => setEpisode(data));
    fetch(`/api/comments?episodeId=${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);


  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ episodeId: id, content: newComment }),
    });
    const updatedComments = await response.json();
    setComments(updatedComments);
    setNewComment('');
  };


  if (!episode) return <Layout>Loading...</Layout>;


  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {episode.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {episode.podcast} | {episode.date}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <audio controls>
            <source src={episode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      </Box>


      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Show Notes
        </Typography>
        <Typography variant="body1">{episode.showNotes}</Typography>
      </Box>


      <Divider sx={{ my: 4 }} />


      <Box>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
          >
            Submit
          </Button>
        </Paper>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={comment.content}
                secondary={`By ${comment.user} - ${comment.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
}