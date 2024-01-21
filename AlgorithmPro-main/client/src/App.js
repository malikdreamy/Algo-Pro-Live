import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FilePages from './pages/SavedWork';
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import CHAT from "../src/components/CHAT";
import Login from "./pages/Loginpage";
import Profile from "./pages/Profile";
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [files, setFiles] = useState([]);

  const updateFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleFromChild = (files) => {
    return files;
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar className="relative" style={{ zIndex: '9999' }} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<CHAT files={files} sendToApp={handleFromChild} />} />
          <Route path="/files" element={<FilePages files={files} updateFiles={updateFiles} handleFromChild={handleFromChild} />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
