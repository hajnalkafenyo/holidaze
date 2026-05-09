import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

export default function ProfileCard() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* CARD HEADER START */}
      <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
        {/* PROFILE PHOTO */}
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <PhotoCameraIcon
              sx={{
                border: "5px solid white",
                backgroundColor: "#ff558f",
                borderRadius: "50%",
                padding: ".2rem",
                width: 35,
                height: 35,
              }}
            ></PhotoCameraIcon>
          }
        >
          <Avatar
            sx={{ width: 100, height: 100, mb: 1.5 }}
            src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
          ></Avatar>
        </Badge>
      </Grid>
    </Grid>
  );
}
