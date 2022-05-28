import React from "react";
import styled from "styled-components";
import FeedTweet from "./FeedTweet";
import { GeneralContext } from "./GeneralContext";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorPage from "./ErrorPage";
import TweetBox from "./TweetBox";

const HomeFeed = () => {
  const { homeFeed, homeStatus, error, currentUserStatus, currentUser } =
    React.useContext(GeneralContext);

  return (
    <Home>
      {error && (
        <Wrapper>
          <ErrorPage />
        </Wrapper>
      )}
      <TextBoxWrapper>
        {currentUserStatus === "idle" && !error ? (
          <TweetBox currentUser={currentUser} />
        ) : (
          currentUserStatus === "loading" &&
          !error && (
            <UpperCircularWrapper>
              <CircularProgress />{" "}
            </UpperCircularWrapper>
          )
        )}
      </TextBoxWrapper>
      {homeStatus === "idle" && !error
        ? homeFeed.tweetIds.map((id) => (
            <FeedTweet
              key={id}
              id={homeFeed.tweetsById[id].id}
              status={homeFeed.tweetsById[id].status}
              handle={homeFeed.tweetsById[id].author.handle}
              displayName={homeFeed.tweetsById[id].author.displayName}
              avatarSrc={homeFeed.tweetsById[id].author.avatarSrc}
              mediaSrc={
                homeFeed.tweetsById[id].media.length > 0
                  ? homeFeed.tweetsById[id].media[0].url
                  : ""
              }
              timestamp={homeFeed.tweetsById[id].timestamp}
              retweetedFrom={
                homeFeed.tweetsById[id].retweetFrom
                  ? homeFeed.tweetsById[id].retweetFrom.displayName
                  : ""
              }
              isLiked={homeFeed.tweetsById[id].isLiked}
              isRetweeted={homeFeed.tweetsById[id].isRetweeted}
              numLikes={homeFeed.tweetsById[id].numLikes}
              numRetweets={homeFeed.tweetsById[id].numRetweets}
            />
          ))
        : homeStatus === "loading" &&
          !error && (
            <CircleWrapper>
              <CircularProgress />{" "}
            </CircleWrapper>
          )}
    </Home>
  );
};

const Home = styled.div`
  width: 900px;
  border: solid;
  border-color: lightgrey;
`;

const TextBoxWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  margin-left: 100px;
`;

const CircleWrapper = styled.div`
  position: relative;
  top: 50%;
  margin-left: 50%;
`;

const UpperCircularWrapper = styled.div`
  position: relative;
  margin-left: 50%;
`;

export default HomeFeed;
