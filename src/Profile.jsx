//import { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import ProfileCard from "./components/profileCard";
import { VenueCard } from "./components/venueCard";
import { useState } from "react";

// APP
export function Profile() {
  const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
   try {
      const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"X-Noroff-API-Key": NOROFF_API_KEY,
        },
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
    <Grid direction="column" sx={{ overflowX: "hidden" }}>
      <Grid sm={12} md={6}>
        <img
          alt="avatar"
          style={{
            width: "100vw",
            height: "35vh",
            objectFit: "cover",
            objectPosition: "50% 50%",
            position: "relative",
          }}
          src="https://iris2.gettimely.com/images/default-cover-image.jpg"
        />
      </Grid>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          position: "absolute",
          top: "20vh",
          px: { xs: 0, md: 7 },
        }}
      >
        {/* PROFILE CARD */}
        <Grid>
          <Grid md={3}>
            <ProfileCard
            /* name="Jane Smith"
            sub="director"
            dt1={mainUser.dt1}
            dt2={mainUser.dt2}
            dt3={mainUser.dt3}*/
            ></ProfileCard>
          </Grid>
          <Paper
            elevation={3}
            variant="outlined"
            square
            sx={{ padding: "8px", width: "100%" }}
          >
            <Typography variant="h2" component="h2">
              Bio
            </Typography>
            <p>Hello, my name is John Doe</p>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
