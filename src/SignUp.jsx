import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

import { LockOutline } from "@mui/icons-material";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "./validators/validators";

const API_BASE_URL = "https://v2.api.noroff.dev";
const NOROFF_API_KEY = "72a1c703-80ba-45da-a12e-3fcc1efb2c64";

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const loginHandle = async () => {
    setIsLoading(true);

    const body = {
      name: name,
      email: email,
      password: password,
      venueManager: venueManager,
    };

    try {
      const res = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": NOROFF_API_KEY,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();

        if (data.error) {
          setError(data.error.message);
          setIsLoading(false);
          return;
        }

        setError("API returned invalid state");
        setIsLoading(false);
        return;
      }
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setError("");
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return <p>There was an error when loading the data. {error}</p>;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar>
            <LockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const emailMessage = validateEmail(email);
            setEmailError(emailMessage);
            const passwordMessage = validatePassword(password);
            setPasswordError(passwordMessage);
            const nameMessage = validateName(name);
            setNameError(nameMessage);
            if (
              emailMessage === "" &&
              passwordMessage === "" &&
              nameMessage === ""
            ) {
              loginHandle();
            }
          }}
        >
          <Grid container spacing={2} sx={{ padding: "8px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={nameError != ""}
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="name"
                value={name}
                helperText={nameError}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError != ""}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError != ""}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                helperText={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={venueManager}
                    color="primary"
                    onChange={(e) => setVenueManager(e.target.checked)}
                  />
                }
                label="Register as Venue Manager"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/log-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
