import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./components/providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import SplitzProvider from './components/providers/SplitzProvider';
import FooterMenu from './components/Footer';

export const App = () => {
  return (
    <Router>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
        <FooterMenu />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
