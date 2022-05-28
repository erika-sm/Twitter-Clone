import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<HomeFeed />} />
          <Route path="/notifications" exact element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/tweet/:tweetId" element={<TweetDetails />} />
          <Route path="/:profileId" element={<Profile />} />
        </Routes>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default App;
