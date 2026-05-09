import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { BasicRating } from "./basicRating";

export function VenueCard({ venue }) {
  if (!venue) return null;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={venue.media[0]?.url}
        title={venue.media[0]?.alt}
      />
      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {venue.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {venue.location.city}
          </Typography>
        </CardContent>
        <BasicRating rating={venue.rating} />
      </Grid>
      <CardActions>
        <Button variant="contained" color="primary" size="medium">
          Share
        </Button>
        <Button
          href={`/venue/${venue.id}`}
          variant="outlined"
          color="secondary"
          size="medium"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
