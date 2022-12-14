import { ThemeProvider } from "@emotion/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
// export function Login(){
//   const navigate = useNavigate();
//   const { login, authed } = useAuth();
//   const { state } = useLocation();

//   const handleLogin = () => {
//     console.log(state.path, authed)
//     login().then((res) => {
//       console.log(res)
//       console.log(authed)
//       console.log("Login successfull")
//       navigate(state?.path || "/");
//     });
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Log in</button>
//     </div>
//   );
// };
const theme = createTheme();

export function Login() {
  const navigate = useNavigate();
  const { login, authed, setAuthed} = useAuth();
  const { state } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(state?.path, authed)
    login({
      username: data.get("username"),
      password: data.get(
        "password")
    }).then((res) => {
      setAuthed(true)
      console.log(res)
      console.log(authed)
      console.log("Login successfull")
      navigate(state?.path || "/");
    });
    // const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password")
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}