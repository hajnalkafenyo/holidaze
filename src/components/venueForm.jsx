import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function BasicSelect({ amount, setAmount }) {
  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Guests</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={amount}
          label="Max guests"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function CheckboxLabels({ values, setValues }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={values.breakfast}
            onChange={(_, checked) => {
              setValues({
                ...values,
                breakfast: checked,
              });
            }}
          />
        }
        color="secondary"
        label="Breakfast"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.parking}
            onChange={(_, checked) => {
              setValues({
                ...values,
                parking: checked,
              });
            }}
          />
        }
        color="secondary"
        label="Parking"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.pets}
            onChange={(_, checked) => {
              setValues({
                ...values,
                pets: checked,
              });
            }}
          />
        }
        color="secondary"
        label="Pets"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.wifi}
            onChange={(_, checked) => {
              setValues({
                ...values,
                wifi: checked,
              });
            }}
          />
        }
        color="secondary"
        label="Wifi"
      />
    </FormGroup>
  );
}

export function VenueForm({ defaultValues, submit }) {
  const [pictures, setPictures] = useState(
    defaultValues.media.map((media) => {
      return media.url;
    }),
  );
  const [guests, setGuests] = useState(defaultValues.maxGuests);
  const [country, setCountry] = useState(defaultValues.location.country);
  const [city, setCity] = useState(defaultValues.location.city);
  const [zip, setZip] = useState(defaultValues.location.zip);
  const [address, setAddress] = useState(defaultValues.location.address);
  const [description, setDescription] = useState(defaultValues.description);
  const [price, setPrice] = useState(defaultValues.price);
  const [name, setName] = useState(defaultValues.name);
  const [latitude, setLatitude] = useState(defaultValues.location.lat);
  const [longitude, setLongitude] = useState(defaultValues.location.lng);
  const [services, setServices] = useState(defaultValues.meta);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const body = {
          name: name, // Optional
          description: description, // Optional
          media: pictures
            .filter((picture) => {
              return picture !== "";
            })
            .map((picture, index) => {
              return {
                url: picture,
                alt: `${index + 1}. picture of the venue`,
              };
            }),
          price: price, // Optional
          maxGuests: guests, // Optional
          meta: services,
          location: {
            address: address, // Optional
            city: city, // Optional
            zip: zip, // Optional
            country: country, // Optional
            lat: latitude, // Optional
            lng: longitude, // Optional
          },
        };

        console.log("body", body);
        submit(body);
      }}
    >
      <Grid container sx={{ p: 2 }}>
        <Grid size={12}>
          <TextField
            sx={{ width: "100%" }}
            id="standard-basic"
            label="Venue name"
            variant="standard"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={6}>
          <Stack sx={{ gap: 2 }}>
            {pictures.map((picture, index) => (
              <Paper
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <TextField
                  label="Picture of the Venue"
                  sx={{ flexGrow: "1" }}
                  color="secondary"
                  onChange={(e) => {
                    setPictures((prev) =>
                      prev.map((p, id) => (id === index ? e.target.value : p)),
                    );
                  }}
                  value={picture}
                />
                <Button
                  onClick={() => {
                    setPictures((p) => p.filter((v, id) => id !== index));
                  }}
                  type="button"
                >
                  X
                </Button>
              </Paper>
            ))}
          </Stack>

          <Button
            onClick={() => {
              setPictures((p) => [...p, ""]);
            }}
            type="button"
          >
            Add image
          </Button>
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
                  <CheckboxLabels values={services} setValues={setServices} />
                </div>
                <div style={{ gap: 4 }}>
                  <BasicSelect amount={guests} setAmount={setGuests} />
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
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price?.toString()}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  startAdornment={
                    <InputAdornment position="start">Kr</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
            </Paper>
            <Paper
              sx={{
                padding: "4px",
                alignContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" component="h6">
                Location
              </Typography>
              <TextField
                id="standard-basic"
                label="country"
                value={country}
                variant="standard"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="city"
                value={city}
                variant="standard"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="postal code"
                value={zip}
                variant="standard"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="adress"
                value={address}
                variant="standard"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <div sx={{ display: "flex", flexDirection: "row" }}>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Latitude
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={latitude.toString()}
                    label="Latitude"
                    onChange={(e) => {
                      setLatitude(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Longitude
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={longitude.toString()}
                    label="Longitude"
                    onChange={(e) => {
                      setLongitude(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
              </div>
            </Paper>
          </Stack>
        </Grid>
        <Paper
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h2" component="h2">
            Description
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            id="outlined-multiline-static"
            label="Description of the Venue"
            multiline
            rows={4}
            defaultValue={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Paper>
        <div
          style={{ display: "flex", alignItems: "justify", marginTop: "16px" }}
        >
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" color="secondary" type="button">
            Cancel
          </Button>
        </div>
      </Grid>
    </form>
  );
}
