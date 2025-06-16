import { Container, Typography, Box } from '@mui/material';

const About = () => {
    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1">
                    This is a simple blog application created with React and Material-UI. It allows users to create, edit, and delete posts, as well as interact with content from other users.
                </Typography>
            </Container>
        </Box>
    );
};

export default About;
