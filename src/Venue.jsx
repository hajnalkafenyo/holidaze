import { Dining, LocalParking, Person, Pets, Wifi } from "@mui/icons-material";
import {
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  TextField,
  Alert,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { BasicRating } from "./components/basicRating";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Venue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  useEffect(() => {
    async function getVenue() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
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

    getVenue();
  }, [id]);

  const isVenueOwner = () => {
    const userStr = window.localStorage.getItem("user");
    if (!userStr || !data?.owner) return false;
    const user = JSON.parse(userStr);
    return user.name === data.owner.name;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!dateFrom || !dateTo || !guests) {
      setBookingError("Please fill in all booking fields");
      return;
    }

    if (new Date(dateFrom) >= new Date(dateTo)) {
      setBookingError("Check-out date must be after check-in date");
      return;
    }

    if (guests > data.maxGuests) {
      setBookingError(`Maximum guests is ${data.maxGuests}`);
      return;
    }

    if (guests < 1) {
      setBookingError("At least 1 guest required");
      return;
    }

    try {
      setIsBooking(true);
      const userStr = window.localStorage.getItem("user");
      if (!userStr) {
        navigate("/log-in");
        return;
      }

      const user = JSON.parse(userStr);
      const bookingBody = {
        dateFrom: new Date(dateFrom).toISOString().split("T")[0],
        dateTo: new Date(dateTo).toISOString().split("T")[0],
        guests: parseInt(guests),
        venueId: id,
      };

      const res = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
        },
        body: JSON.stringify(bookingBody),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setBookingError(
            data.errors[0]?.message || "Failed to create booking",
          );
        } else {
          setBookingError("Failed to create booking");
        }
        setIsBooking(false);
        return;
      }

      setBookingSuccess("Booking created successfully!");
      setDateFrom("");
      setDateTo("");
      setGuests(1);
    } catch (e) {
      setBookingError(e.message || "An error occurred while creating booking");
    } finally {
      setIsBooking(false);
    }
  };

  if (!data) {
    return null;
  }
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid size={12} sx={{ p: 2 }}>
        <Typography variant="h2" component="h2">
          {data.name}
        </Typography>
        <Typography variant="h5" component="p">
          {data.location.address}, {data.location.zip} {data.location.city}
        </Typography>
        <Typography variant="h5" component="p">
          {data.location.country}
        </Typography>
        {isVenueOwner() && (
          <Button
            variant="contained"
            onClick={() => navigate(`/venue/${id}/edit`)}
          >
            Edit
          </Button>
        )}
      </Grid>
      <Grid size={6}>
        <img
          alt="avatar"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            objectPosition: "50% 50%",
            position: "relative",
          }}
          src={data.media[0]?.url}
          title={data.media[0]?.alt}
        />
      </Grid>
      <Grid size={6} sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Paper
            elevation={3}
            variant="outlined"
            square
            sx={{ padding: "8px", width: "70%" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="h6">
                Services
              </Typography>
              <div style={{ gap: 4 }}>
                <Tooltip title="Pets">{data.meta.pets && <Pets />}</Tooltip>
                <Tooltip title="Wifi">{data.meta.wifi && <Wifi />}</Tooltip>
                <Tooltip title="Breakfast">
                  {data.meta.breakfast && <Dining />}
                </Tooltip>
                <Tooltip title="Parking">
                  {data.meta.parking && <LocalParking />}
                </Tooltip>
              </div>
              <div style={{ gap: 4 }}>
                {new Array(data.maxGuests).fill(0).map(() => (
                  <Person />
                ))}
              </div>
            </div>
          </Paper>
          <Paper
            elevation={3}
            variant="outlined"
            square
            sx={{ padding: "8px", width: "70%" }}
          >
            <Typography variant="h6" component="h6">
              Price
            </Typography>
            <Typography variant="h6" component="h6">
              {data.price} Nok
            </Typography>
            <BasicRating rating={data.rating} />
          </Paper>
          {data.location.lat && data.location.lng && (
            <Paper sx={{ padding: "4px", alignContent: "center" }}>
              <iframe
                width="425"
                height="350"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.location.lng - 1},${data.location.lat - 1},${data.location.lng + 1},${data.location.lat + 1}&layer=mapquest&marker=${data.location.lat},${data.location.lng}`}
                style={{ border: "1px solid black", width: "100%" }}
              ></iframe>
              <br />
              <small>
                <a
                  href={`https://www.openstreetmap.org/?#map=14/${data.location.lat}/${data.location.lng}`}
                >
                  Bigger map
                </a>
              </small>
            </Paper>
          )}
        </Stack>
      </Grid>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h2" component="h2">
          Description
        </Typography>
        <Typography variant="h5" component="p">
          {data.description}
        </Typography>
      </Paper>

      <Grid size={12} sx={{ p: 2 }}>
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            Create a Booking
          </Typography>

          {bookingError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {bookingError}
            </Alert>
          )}

          {bookingSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {bookingSuccess}
            </Alert>
          )}

          <form onSubmit={handleBooking}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                label="Check-in Date"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                disabled={isBooking}
                InputLabelProps={{ shrink: true }}
                slotProps={{
                  input: { min: new Date().toISOString().split("T")[0] },
                }}
              />
              <TextField
                label="Check-out Date"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                disabled={isBooking}
                InputLabelProps={{ shrink: true }}
                slotProps={{
                  input: { min: new Date().toISOString().split("T")[0] },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Number of Guests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={isBooking}
                inputProps={{ min: 1, max: data.maxGuests }}
                fullWidth
              />
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                Maximum guests: {data.maxGuests}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">
                Price per night: {data.price} NOK
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isBooking}
              fullWidth
              size="large"
            >
              {isBooking ? "Creating Booking..." : "Create Booking"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
