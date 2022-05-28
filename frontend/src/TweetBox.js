import React from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { GeneralContext } from "./GeneralContext";
import { CircularProgress } from "@mui/material";


const TweetBox = ({ currentUser }) => {
const { setHomeFeed, setHomeStatus, setError } =
    React.useContext(GeneralContext);

const [status, setStatus] = React.useState("");
const [isPosting, setIsPosting] = React.useState(false);
const [postError, setPostError] = React.useState(false);

let charactersLeft = 280 - status.length;

const handleStyling = () => {
    if(charactersLeft <= 55 && charactersLeft > 0)
    return{color: '#ffe135'
    }
    else if (charactersLeft < 0)
    return {color: 'red'
    }
    else return {
        color: 'grey'
        
    }
};

const handlePublishTweet = (e) => {
    e.preventDefault();
    
    const tweet = { status };

    setIsPosting(true);
    setPostError(false);

    fetch("api/tweet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tweet),
    }).then(res => {
        if(!res.ok){
        throw Error();
        }
    }).then(() => {
        setIsPosting(false)
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
    .then(() => setStatus(""))
    .catch(() => {
        setPostError(true);
        setIsPosting(false);
    })
};

return (
    <>
    <Wrapper>
        <Avatar src={currentUser.profile.avatarSrc} />
        <form onSubmit={handlePublishTweet}>
        <InputBox
            type="text"
            required
            placeholder="What's happening?"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        />
        <ButtonWrapper>
            {charactersLeft < 0 ? <Meow disabled>Meow</Meow> : isPosting === true ? <Meow disabled ><CircularProgress size={20}/></Meow> : <Meow>Meow</Meow> }
            <CharacterCountdown style={handleStyling()}>{charactersLeft}</CharacterCountdown>
            {postError && <ErrorMessage>Tweet submission failed. Please meow again!</ErrorMessage> }
        </ButtonWrapper>
        </form>
    </Wrapper>
    </>
);
};

const Wrapper = styled.div`
  border: solid;
  border-color: lightgrey;
  border-bottom-width: 10px;
  display: flex;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 60px;
  margin-left: 10px;
  margin-top: 10px;
`;

const InputBox = styled.textarea`
  margin-top: 10px;
  font-size: 20px;
  margin-left: 20px;
  height: 200px;
  width: 700px;
  border: none;
  resize: none;
  outline: none;
`;
const Meow = styled.button`
  background-color: ${COLORS.primary};
  border-radius: 24px;
  color: white;
  width: 120px;
  padding: 15px;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  left: 600px;

  &:disabled{
      opacity: 0.5;
      cursor: not-allowed;
  }
`;

const CharacterCountdown = styled.div`
  margin-bottom: 10px;
  position: absolute;
  top: 40px;
  margin-bottom: 20px;
  left: 560px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 100px;
  color: red;
`;

const ErrorMessage =  styled.p`
color: red;
margin-left: 150px;
font-weight: bold;`

export default TweetBox;
