import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Fab,
  IconButton,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (a.createdAt) return -1;
        if (b.createdAt) return 1;
        return 0;
      });
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: "#fafbfc",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Blog Posts
        </Typography>
        <Box>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: { xs: "95%", sm: "85%", md: "75%" },
                maxWidth: "900px",
                margin: "0 auto 32px auto",
              }}
            >
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="250"
                  image={post.imageUrl}
                  alt={post.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="h2" align="center">
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2, mb: 2 }}
                >
                  {post.content}
                </Typography>
                {post.author && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: -6, display: "block" }}
                  >
                    By: {user.username}
                  </Typography>
                )}
              </CardContent>
              {user.id === post.userId && (
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(post.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          ))}
        </Box>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick={() => navigate("/create-post")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Home;
