import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, justifyContent: "flex-start" }}
        >
          <BookIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
