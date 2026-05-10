import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  Divider,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const API_BASE_URL = "https://v2.api.noroff.dev";

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Bookings and Venues state
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [venues, setVenues] = useState([]);
  const [isLoadingVenues, setIsLoadingVenues] = useState(false);
  const [venuesError, setVenuesError] = useState("");

  // Venue bookings modal state
  const [venueBookingsDialog, setVenueBookingsDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venueBookings, setVenueBookings] = useState([]);
  const [isLoadingVenueBookings, setIsLoadingVenueBookings] = useState(false);
  const [venueBookingsError, setVenueBookingsError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = window.localStorage.getItem("user");
        if (!userStr) {
          navigate("/log-in");
          return;
        }

        const user = JSON.parse(userStr);
        if (!user?.name) {
          navigate("/log-in");
          return;
        }

        setIsLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/holidaze/profiles/${user.name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
            },
          },
        );

        if (!res.ok) {
          const data = await res.json();
          if (data.errors) {
            setError(data.errors[0]?.message || "Failed to load profile");
          } else {
            setError("Failed to load profile");
          }
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data.data);
        setBio(data.data.bio || "");
        setAvatarUrl(data.data.avatar?.url || "");
        setBannerUrl(data.data.banner?.url || "");
        setVenueManager(data.data.venueManager || false);
        setError("");
      } catch (e) {
        setError(e.message || "An error occurred while loading the profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userStr = window.localStorage.getItem("user");
        if (!userStr) return;

        const user = JSON.parse(userStr);
        setIsLoadingBookings(true);
        const res = await fetch(
          `${API_BASE_URL}/holidaze/profiles/${user.name}/bookings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
            },
          },
        );

        if (!res.ok) {
          setBookingsError("Failed to load bookings");
          setIsLoadingBookings(false);
          return;
        }

        const data = await res.json();
        setBookings(data.data || []);
        setBookingsError("");
      } catch (e) {
        setBookingsError(e.message || "Error loading bookings");
      } finally {
        setIsLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  // Fetch venues (if venue manager)
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const userStr = window.localStorage.getItem("user");
        if (!userStr) return;

        const user = JSON.parse(userStr);
        setIsLoadingVenues(true);
        const res = await fetch(
          `${API_BASE_URL}/holidaze/profiles/${user.name}/venues`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
            },
          },
        );

        if (!res.ok) {
          setVenuesError("Failed to load venues");
          setIsLoadingVenues(false);
          return;
        }

        const data = await res.json();
        setVenues(data.data || []);
        setVenuesError("");
      } catch (e) {
        setVenuesError(e.message || "Error loading venues");
      } finally {
        setIsLoadingVenues(false);
      }
    };

    if (venueManager) {
      fetchVenues();
    }
  }, [venueManager]);

  const handleOpenVenueBookings = async (venue) => {
    setSelectedVenue(venue);
    setVenueBookingsDialog(true);
    setIsLoadingVenueBookings(true);
    try {
      const userStr = window.localStorage.getItem("user");
      const user = JSON.parse(userStr);

      const res = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venue.id}/bookings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
          },
        },
      );

      if (!res.ok) {
        setVenueBookingsError("Failed to load bookings");
        setIsLoadingVenueBookings(false);
        return;
      }

      const data = await res.json();
      setVenueBookings(data.data || []);
      setVenueBookingsError("");
    } catch (e) {
      setVenueBookingsError(e.message || "Error loading bookings");
    } finally {
      setIsLoadingVenueBookings(false);
    }
  };

  const handleCloseVenueBookings = () => {
    setVenueBookingsDialog(false);
    setSelectedVenue(null);
    setVenueBookings([]);
    setVenueBookingsError("");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");

    // Validate at least one field is provided
    if (!bio && !avatarUrl && !bannerUrl && !venueManager) {
      setUpdateError("Please make at least one change to save");
      return;
    }

    try {
      setIsUpdating(true);
      const userStr = window.localStorage.getItem("user");
      const user = JSON.parse(userStr);

      const updateBody = {};
      if (bio) updateBody.bio = bio;
      if (avatarUrl) {
        updateBody.avatar = {
          url: avatarUrl,
          alt: "User avatar",
        };
      }
      if (bannerUrl) {
        updateBody.banner = {
          url: bannerUrl,
          alt: "User banner",
        };
      }
      updateBody.venueManager = venueManager;

      const res = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
          },
          body: JSON.stringify(updateBody),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setUpdateError(data.errors[0]?.message || "Failed to update profile");
        } else {
          setUpdateError("Failed to update profile");
        }
        setIsUpdating(false);
        return;
      }

      const data = await res.json();
      setProfile(data.data);
      setUpdateSuccess("Profile updated successfully!");
      setTimeout(() => setUpdateSuccess(""), 3000);
    } catch (e) {
      setUpdateError(e.message || "An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Error loading profile: {error}</Alert>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">No profile data found</Alert>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Cover Image */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", md: "300px" },
          backgroundImage: `url(${bannerUrl || profile.banner?.url || "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=300&fit=crop"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          mb: 4,
        }}
      />

      <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 } }}>
        {/* Profile Card Section */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar
                src={avatarUrl || profile.avatar?.url}
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  mb: 2,
                  fontSize: "3rem",
                }}
              >
                {profile.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {profile.email}
              </Typography>
              <Divider sx={{ my: 2 }} />

              {/* Profile Stats */}
              <Box sx={{ textAlign: "left", mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <strong>User ID:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2, wordBreak: "break-all" }}
                >
                  {profile.id}
                </Typography>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <strong>Joined:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {formatDate(profile.created)}
                </Typography>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <strong>Last Updated:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {formatDate(profile.updated)}
                </Typography>

                {profile._count && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <strong>Bookings:</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      {profile._count.bookings || 0}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <strong>Venues:</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {profile._count.venues || 0}
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Form Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Edit Profile
            </Typography>

            {updateError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {updateError}
              </Alert>
            )}

            {updateSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {updateSuccess}
              </Alert>
            )}

            <form onSubmit={handleProfileUpdate}>
              {/* Bio Field */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Bio
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={isUpdating}
                  variant="outlined"
                />
              </Box>

              {/* Avatar URL Field */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Avatar URL
                </Typography>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  disabled={isUpdating}
                  variant="outlined"
                  size="small"
                />
                {avatarUrl && (
                  <Box sx={{ mt: 2, maxWidth: "200px" }}>
                    <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                      Avatar Preview:
                    </Typography>
                    <img
                      src={avatarUrl}
                      alt="Avatar preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Banner URL Field */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Banner URL
                </Typography>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="https://example.com/banner.jpg"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  disabled={isUpdating}
                  variant="outlined"
                  size="small"
                />
                {bannerUrl && (
                  <Box sx={{ mt: 2, maxWidth: "100%", height: "100px" }}>
                    <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                      Banner Preview:
                    </Typography>
                    <img
                      src={bannerUrl}
                      alt="Banner preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Venue Manager Checkbox */}
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={venueManager}
                      onChange={(e) => setVenueManager(e.target.checked)}
                      disabled={isUpdating}
                    />
                  }
                  label="Venue Manager"
                />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdating}
                fullWidth
              >
                {isUpdating ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Bookings Section */}
      <Grid item xs={12} sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My Bookings
        </Typography>
        {isLoadingBookings && <CircularProgress />}
        {bookingsError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {bookingsError}
          </Alert>
        )}
        {!isLoadingBookings && bookings.length === 0 && (
          <Alert severity="info">No bookings yet</Alert>
        )}
        {!isLoadingBookings && bookings.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Check-in</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Check-out</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Guests</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Days</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings
                  .sort(
                    (a, b) =>
                      new Date(b.dateFrom) - new Date(a.dateFrom),
                  )
                  .map((booking) => {
                    const checkIn = new Date(booking.dateFrom);
                    const checkOut = new Date(booking.dateTo);
                    const days = Math.ceil(
                      (checkOut - checkIn) / (1000 * 60 * 60 * 24),
                    );
                    return (
                      <TableRow key={booking.id}>
                        <TableCell>{formatDate(booking.dateFrom)}</TableCell>
                        <TableCell>{formatDate(booking.dateTo)}</TableCell>
                        <TableCell>{booking.guests}</TableCell>
                        <TableCell>{days}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>

      {/* Venues Section (if venue manager) */}
      {venueManager && (
        <Grid item xs={12} sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My Venues
          </Typography>
          {isLoadingVenues && <CircularProgress />}
          {venuesError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {venuesError}
            </Alert>
          )}
          {!isLoadingVenues && venues.length === 0 && (
            <Alert severity="info">No venues created yet</Alert>
          )}
          {!isLoadingVenues && venues.length > 0 && (
            <Grid container spacing={3}>
              {venues.map((venue) => (
                <Grid item xs={12} sm={6} md={4} key={venue.id}>
                  <Card elevation={2} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    {venue.media && venue.media[0] && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={venue.media[0].url}
                        alt={venue.media[0].alt || venue.name}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {venue.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {venue.location?.city}, {venue.location?.country}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        {venue.price} NOK/night
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Max guests: {venue.maxGuests}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">
                          Rating: {venue.rating || "N/A"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
