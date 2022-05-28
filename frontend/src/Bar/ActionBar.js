import React, {useState} from "react";
import styled from "styled-components";

import LikeButton from "./Like Button";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import { GeneralContext } from "../GeneralContext";



const ActionBar = ({ isLiked, id, numLikes}) => {
  const [liked, setLiked] = useState(isLiked);
  const [numbLikes, setNumbLikes] = useState(numLikes);

  const { setHomeFeed, setHomeStatus, setError } =
      React.useContext(GeneralContext);

  const handleToggleLike = (e) => {
    e.stopPropagation();

    fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: !liked }),
    }).then(() => {
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
      })
  })
  if(liked){
  setNumbLikes(numbLikes - 1);
}
  else if(liked === false){
    setNumbLikes(numbLikes + 1);
  }
  setLiked(!liked);
};


  return (
    <Wrapper>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="reply" />
      </Action>
      <Action color="rgb(23, 191, 99)" size={40}>
        <TweetActionIcon
          kind="retweet"
        />
      </Action>
      <Action onClick={handleToggleLike} onKeyDown={(ev) => ev.code === "Enter" && handleToggleLike(ev)}  color="rgb(224, 36, 94)" size={40}>
        <LikeButton liked={liked} />
        {numbLikes != 0 && numbLikes}
      </Action>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

export default ActionBar;
