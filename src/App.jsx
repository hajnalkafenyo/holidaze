import { Login } from "./LogIn";
import { SignUp } from "./SignUp";
import { Profile } from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ResponsiveAppBar from "./components/appBar";
import Venue from "./Venue";
import EditVenue from "./EditVenue";
import NewVenue from "./NewVenue";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" index Component={Home} />
        <Route path="/log-in" index Component={Login} />
        <Route exact path="/sign-up" Component={SignUp} />
        <Route exact path="/profile" Component={Profile} />
        <Route exact path="/new-venue" Component={NewVenue} />
        <Route exact path="/venue/:id" Component={Venue} />
        <Route exact path="/venue/:id/edit" Component={EditVenue} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
