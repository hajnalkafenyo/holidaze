import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { BasicRating } from "./basicRating";
import { Person } from "@mui/icons-material";

export default function BookingCard() {
  return (
    <Card
      variant="elevation"
      sx={{ display: "flex", width: "80%", height: "100%", m: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          <Box>
            <Typography component="div" variant="h5" sx={{ mb: 0.5 }}>
              My Hotel
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              Oslo, Norway
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Typography sx={{ mb: 1 }}>26.08.2026-01.11.2026</Typography>
              </Grid>
              <Grid size={6}>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Person />
                  <Person />
                  <Person />
                  <Person />
                </Box>
              </Grid>
              <Grid size={6} sx={{ textAlign: "right" }}>
                <Box>
                  <BasicRating />
                  <Typography sx={{ mt: 0.5 }}>1245 NOK</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
