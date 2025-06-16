import { useState, useEffect, useCallback } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const fetchPost = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`);
            const data = await response.json();

            if (data.userId !== user.id) {
                alert('You are not authorized to edit this post.');
                navigate('/');
                return;
            }

            setFormData({
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl || '',
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            alert('Error loading post data.');
            navigate('/');
        }
    }, [id, user.id, navigate]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    ...formData,
                    userId: user.id,
                    author: user.name,
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                alert('Failed to update post. Please try again.');
            }
        } catch (error) {
            console.error('Update post error:', error);
            alert('An error occurred while updating the post.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Edit Post
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Update Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditPost;