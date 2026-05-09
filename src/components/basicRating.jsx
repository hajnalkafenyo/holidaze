import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export function BasicRating({ rating = 3 }) {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Typography component="legend">Rating</Typography>
      <Rating name="read-only" value={rating} readOnly />
    </Box>
  );
}
