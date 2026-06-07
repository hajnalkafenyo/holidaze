# Holidaze - Project Exam 2

## Project Description

Holidaze is a modern booking platform that connects travelers with accommodation venues. The application serves two main user types: customers seeking vacation accommodations and venue managers who want to list and manage their properties. Users can browse venues, search for specific accommodations, view availability calendars, and make bookings. Venue managers can create, update, and manage their venues with a complete admin interface.

## Live Demo

[View the live application](https://holidaze-hajnalka.netlify.app/)

## Repository

[View the GitHub repository](https://github.com/yourusername/03_holidaze) (Replace with your actual GitHub repository URL)

## Features

### For Customers
- **Browse Venues**: View all available accommodation venues
- **Search Venues**: Search for specific venues by name or location
- **Venue Details**: View detailed information about venues including images and amenities
- **Check Availability**: View a calendar showing available dates for booking
- **Make Bookings**: Create bookings for your desired dates
- **View Bookings**: See all your upcoming and past bookings in one place
- **User Account**: Register and manage your customer profile
- **Update Profile**: Change your avatar and personal information

### For Venue Managers
- **Create Venues**: List your properties on the platform with full details
- **Manage Venues**: Update venue information, images, and amenities
- **Delete Venues**: Remove venues from the platform
- **Manage Bookings**: View and manage all bookings for your venues
- **Calendar Management**: Set availability and manage booking dates
- **Manager Account**: Special registration for venue managers with @stud.noroff.no email

## Technologies Used

- **Frontend Framework**: React 19+
- **Styling**: Material-UI (MUI 5+)
- **Routing**: React Router
- **State Management**: React Context/Hooks
- **Build Tool**: Vite
- **Design**: Figma
- **Project Management**: Trello
- **Hosting**: Netlify
- **API**: Noroff Holidaze API

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 03_holidaze
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```
VITE_API_URL=https://api.noroff.dev/v1
```

## Running the Project

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## How to Use

### For Customers
1. **Register**: Create a customer account using a valid email
2. **Browse Venues**: Explore all available accommodations on the homepage
3. **Search**: Use the search functionality to find specific venues
4. **View Details**: Click on a venue to see full details and availability
5. **Check Calendar**: View available dates for the venue
6. **Create Booking**: Select dates and confirm your booking
7. **Manage Bookings**: View all your bookings in your user dashboard

### For Venue Managers
1. **Register as Manager**: Sign up with a @stud.noroff.no email address
2. **Create Venue**: Add your first property with details, images, and amenities
3. **Manage Venues**: Update venue information anytime
4. **View Bookings**: See all customer bookings for your venues
5. **Delete Venue**: Remove a property when needed

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Layout.jsx          # Main layout with header/footer
│   ├── Header.jsx          # Navigation header
│   ├── Footer.jsx          # Site footer
│   ├── VenueCard.jsx       # Venue display card
│   └── ...                 # Other components
├── pages/                   # Page components
│   ├── Home.jsx            # Homepage with venue list
│   ├── VenueDetail.jsx     # Individual venue page
│   ├── Booking.jsx         # Booking page
│   ├── MyBookings.jsx      # User bookings page
│   ├── ManageVenues.jsx    # Venue manager dashboard
│   ├── CreateVenue.jsx     # Create new venue form
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration page
│   └── ...                 # Other pages
├── context/                 # React Context for state management
├── utils/                   # Utility functions
└── styles/                  # Global styles
```

## API Integration

The application integrates with the Noroff Holidaze API:

- **Get Venues**: `GET /api/v1/holidaze/venues`
- **Get Single Venue**: `GET /api/v1/holidaze/venues/{id}`
- **Create Booking**: `POST /api/v1/holidaze/bookings`
- **Get Bookings**: `GET /api/v1/holidaze/bookings`
- **Create Venue**: `POST /api/v1/holidaze/venues` (Manager only)
- **Update Venue**: `PUT /api/v1/holidaze/venues/{id}` (Manager only)
- **Delete Venue**: `DELETE /api/v1/holidaze/venues/{id}` (Manager only)

## Authentication

- **Customer Registration**: Any valid email address
- **Manager Registration**: Requires @stud.noroff.no email address
- **Login**: Email and password authentication
- **Token Storage**: JWT token stored in localStorage for session persistence

## Features in Detail

### Venue Management
- Create venues with multiple images
- Add detailed descriptions and amenities
- Set availability dates
- Manage bookings from customers
- Edit venue information anytime
- Delete venues when needed

### Booking System
- Check real-time availability
- Select check-in and check-out dates
- View booking confirmations
- Manage all your bookings in one place
- Cancel bookings if needed

### User Profiles
- Update profile avatar
- View personal information
- Switch between customer and manager roles
- Logout securely

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design & UX

- **Responsive Design**: Mobile-first approach for all screen sizes
- **Material Design**: Clean, modern UI using Material-UI components
- **Accessibility**: WCAG compliance for better accessibility
- **Performance**: Optimized for fast loading and smooth interactions

## Testing the Application

### Test Credentials
For testing, you can use:
- **Customer Account**: Use any valid email address
- **Manager Account**: Use any email ending in @stud.noroff.no

### Test Scenarios
1. Register as a customer and explore venues
2. Make a booking at any venue
3. Register as a venue manager
4. Create and manage your own venues
5. View bookings for your managed venues

## Troubleshooting

### Port Already in Use
Vite will automatically use the next available port if 5173 is in use.

### API Connection Issues
Ensure the API URL in `.env.local` is correct and the Noroff API is accessible.

### Authentication Issues
Clear localStorage and login again:
```javascript
localStorage.clear()
```

### Build Errors
Clean install dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Future Enhancements

Potential improvements for future versions:
- Advanced filtering and sorting options
- User reviews and ratings system
- Favorites/wishlist functionality
- Image upload optimization
- Payment integration
- Email confirmations
- Admin dashboard
- Analytics for venue managers

## Contributing

This is a course assignment project. For feedback or suggestions, please refer to the assignment requirements.

## License

This project was created as a course assignment for Noroff School of Technology and Digital Media.

## Acknowledgments

- **API**: Noroff Holidaze API
- **Design**: Created in Figma
- **UI Framework**: Material-UI (MUI)
- **Project Management**: Trello
- **Build Tool**: Vite
- **Styling**: Emotion (MUI styling solution)
- **Hosting**: Netlify
