import Grid from "@mui/material/Grid";
import { VenueCard } from "./components/venueCard";
import BookingCard from "./components/bookingCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getVenues() {
      setIsLoading(true);
      try {
        const res = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
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
  return (
    <Grid container sx={{ p: 2, gap: 2 }}>
      {data &&
        data.map((venue) => (
          <Grid size={3}>
            <VenueCard venue={venue} />
          </Grid>
        ))}

      <Grid size={12}>
        <BookingCard />
      </Grid>
    </Grid>
  );
}
