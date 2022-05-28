import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ActionBar from "./Bar/ActionBar";

const FeedTweet = ({
  status,
  handle,
  displayName,
  avatarSrc,
  mediaSrc,
  timestamp,
  retweetedFrom,
  id,
  isLiked,
  isRetweeted,
  numLikes,
  numRetweets,
}) => {
  const timeStampFormat = moment(`${timestamp}`).format("MMM Do");

  let navigate = useNavigate();

  const handleLink = (e) => {
    navigate(`/tweet/${id}`);
    e.stopPropagation();
  };

  const handleLinkProfile = (e) => {
    navigate(`/${handle}`);
    e.stopPropagation();
  };

  return (
    <Main>
      <Wrapper
        aria-label="View Tweet"
        tabIndex={0}
        onClick={handleLink}
        onKeyDown={(ev) => ev.code === "Enter" && handleLink(ev)}
      >
        {retweetedFrom ? (
          <Retweeted>
            {" "}
            <FiRepeat /> {retweetedFrom} Remeowed
          </Retweeted>
        ) : (
          ""
        )}
        <HeaderWrapper>
          <Avatar src={avatarSrc} />
          <NameWrapper>
            <DisplayName
              tabIndex={0}
              onClick={handleLinkProfile}
              onKeyDown={(ev) => ev.code === "Enter" && handleLinkProfile(ev)}
            >
              {displayName}
            </DisplayName>
            &nbsp;&nbsp;
            <Username>@{handle}</Username>
            &nbsp;&nbsp;
            <Timestamp>· {timeStampFormat}</Timestamp>
          </NameWrapper>
        </HeaderWrapper>
        <TweetContents>{status}</TweetContents>
        <TweetMedia src={mediaSrc} />

        <Divider />
        <ActionBar
          isLiked={isLiked}
          id={id}
          isRetweeted={isRetweeted}
          numLikes={numLikes}
          numRetweets={numRetweets}
          handle={handle}
        />
        <Divider />
      </Wrapper>
    </Main>
  );
};

const Wrapper = styled.div`
  background: white;
  width: 700px;
  padding: 16px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  margin-left: 90px;
  &:active,
  &:hover {
    cursor: pointer;
  }
`;

const TweetContents = styled.div`
  font-size: 22px;
  padding: 16px 0;
  word-wrap: break-word;
`;

const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const HeaderWrapper = styled.header`
  display: flex;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const NameWrapper = styled.div`
  display: flex;
  padding: 0px 16px;
`;

const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  &:active,
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
`;

const Main = styled.div``;

const TweetMedia = styled.img`
  height: 400px;
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const Retweeted = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
  margin-left: 20px;
`;

export default FeedTweet;
