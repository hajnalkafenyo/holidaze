import { VenueForm } from "./components/venueForm";

export default function NewVenue() {
  return (
    <VenueForm
      defaultValues={{
        maxGuest: 1,
        location: {
          city: "",
          zip: "",
          country: "",
          address: "",
        },
        name: "",
        media: [],
        meta: {
          wifi: false,
          pets: false,
          breakfast: false,
          parking: false,
        },
      }}
      submit={async (body) => {
        const accessToken = window.localStorage.getItem("user");
        try {
          const res = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": "9ac5c94b-623e-4ae8-af56-e222a29990ab",
            },
          });
        } catch (e) {
          console.error(e);
        }
      }}
    />
  );
}
