import Grid from "@mui/material/Grid";
import { VenueCard } from "./components/venueCard";
import BookingCard from "./components/bookingCard";
import { useEffect, useState } from "react";
import { TextField, Box, Typography, Alert } from "@mui/material";

export default function Home() {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getVenues() {
      setIsLoading(true);
      try {
        const res = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
        setData(data.data);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    }

    getVenues();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return <p>There was an error when loading the data. {error}</p>;
  }

  const filteredVenues = data?.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location?.country?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Browse Venues
        </Typography>
        <TextField
          fullWidth
          placeholder="Search by venue name, city, or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
      </Box>

      {filteredVenues && filteredVenues.length === 0 && searchTerm && (
        <Alert severity="info">No venues found matching your search.</Alert>
      )}

      <Grid container sx={{ gap: 2 }}>
        {filteredVenues &&
          filteredVenues.map((venue) => (
            <Grid key={venue.id} size={3}>
              <VenueCard venue={venue} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
