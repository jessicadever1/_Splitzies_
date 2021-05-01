import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./components/providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

export const App = () => {
  return (
    <Router>
      Hello.
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
