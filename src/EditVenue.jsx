import {
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Checkbox,
  Stack,
  TextField,
  Typography,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VenueForm } from "./components/venueForm";

export default function EditVenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    async function putVenue() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
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

    putVenue();
  }, [id]);

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (body) => {
    try {
      const userStr = window.localStorage.getItem("user");
      if (!userStr) {
        navigate("/log-in");
        return;
      }

      const user = JSON.parse(userStr);
      const res = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.errors?.[0]?.message || "Failed to update venue");
        return;
      }

      alert("Venue updated successfully!");
      navigate(`/venue/${id}`);
    } catch (e) {
      alert(e.message || "An error occurred while updating the venue");
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
    try {
      const userStr = window.localStorage.getItem("user");
      if (!userStr) {
        navigate("/log-in");
        return;
      }

      const user = JSON.parse(userStr);
      const res = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
          },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.errors?.[0]?.message || "Failed to delete venue");
        return;
      }

      alert("Venue deleted successfully!");
      navigate("/profile");
    } catch (e) {
      alert(e.message || "An error occurred while deleting the venue");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Edit Venue
        </Typography>
      </Box>
      <VenueForm defaultValues={data} submit={handleSubmit} />
      <Box sx={{ mt: 4, p: 2, bgcolor: "#ffebee", borderRadius: 1 }}>
        <Typography variant="h6" color="error" sx={{ mb: 1 }}>
          Danger Zone
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Permanently delete this venue and all associated data.
        </Typography>
        <Button variant="contained" color="error" onClick={handleDeleteClick}>
          Delete Venue
        </Button>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Venue?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this venue? This action cannot be
            undone. All bookings and data associated with this venue will be
            permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
