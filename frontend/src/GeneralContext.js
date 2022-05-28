import React from "react";

export const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentUserStatus, setCurrentUserStatus] = React.useState("loading");
  const [homeStatus, setHomeStatus] = React.useState("loading");
  const [feedStatus, setFeedStatus] = React.useState("loading");
  const [profileStatus, setProfileStatus] = React.useState("loading");
  const [error, setError] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState([]);
  const [profileFeed, setProfileFeed] = React.useState([]);
  const [homeFeed, setHomeFeed] = React.useState([]);
  const [currentTweet, setCurrentTweet] = React.useState([]);
  const [tweetStatus, setTweetStatus] = React.useState("loading");

  React.useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setHomeFeed(data);
        setHomeStatus("idle");
      })
      .catch(() => {
        setError(true);
        setHomeStatus("idle");
      });
  }, []);

  React.useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setCurrentUserStatus("idle");
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const fetchProfile = (apiLink) => {
    setProfileStatus("loading");
    fetch(apiLink)
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setUserProfile(data);
        setProfileStatus("idle");
      })
      .catch(() => {
        setError(true);
        setProfileStatus("idle");
      });
  };

  const fetchFeed = (apiLink) => {
    fetch(apiLink)
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setProfileFeed(data);
        setFeedStatus("idle");
      })
      .catch(() => {
        setError(true);
        setFeedStatus("idle");
      });
  };

  const fetchTweet = (apiLink) => {
    setTweetStatus("loading");
    fetch(apiLink)
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setCurrentTweet(data);
        setTweetStatus("idle");
      })
      .catch(() => {
        setError(true);
        setTweetStatus("idle");
      });
  };

  return (
    <GeneralContext.Provider
      value={{
        currentUser,
        homeStatus,
        setCurrentUser,
        homeFeed,
        currentTweet,
        setCurrentTweet,
        error,
        profileFeed,
        userProfile,
        profileStatus,
        feedStatus,
        setError,
        fetchProfile,
        fetchFeed,
        setProfileStatus,
        setFeedStatus,
        fetchTweet,
        tweetStatus,
        setTweetStatus,
        currentUserStatus,
        setHomeStatus,
        setHomeFeed,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
