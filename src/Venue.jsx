import { Dining, LocalParking, Person, Pets, Wifi } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { BasicRating } from "./components/basicRating";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
/*
function TitlebarImageList() {
  return (
    <ImageList sx={{ width: "100%", height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Pictures of Venue</ListSubheader>
      </ImageListItem>
      {data?.media?.map((item) => (
        <ImageListItem key={item.url}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${venue.media[0]?.url}?w=248&fit=crop&auto=format`}
            alt={venue.media[0]?.alt}
            loading="lazy"
          />
          <ImageListItemBar
            title={venue.name}
            subtitle={venue.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}*/

export default function Venue() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getVenue() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"X-Noroff-API-Key": NOROFF_API_KEY,
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
        <Button href={"/edit-venue"} variant="contained">
          Edit
        </Button>
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
        {/* <TitlebarImageList /> */}
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
    </Grid>
  );
}
