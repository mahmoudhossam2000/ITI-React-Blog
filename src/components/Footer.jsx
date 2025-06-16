import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#1976D2",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2025 React Blog App. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
