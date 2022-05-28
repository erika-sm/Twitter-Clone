import React from "react";
import { GeneralContext } from "./GeneralContext";
import { useParams, NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import moment from "moment";
import ErrorPage from "./ErrorPage";
import ActionBar from "./Bar/ActionBar";
import { FiRepeat } from "react-icons/fi";



const TweetDetails = () => {
const { currentTweet, fetchTweet, tweetStatus, error } = React.useContext(GeneralContext);

const { tweetId } = useParams();

let timeStampFormat = '';

React.useEffect(() => {  
    fetchTweet(`/api/tweet/${tweetId}`
    );
  }, [tweetId]);

if(tweetStatus === 'idle' && !error &&
currentTweet.tweet.id === tweetId && !error){
timeStampFormat = moment(`${currentTweet.tweet.timestamp}`).format("h:mm a · MMM D YYYY ·");}



return(
<Main>
<Wrapper>
{error && <ErrorWrapper><ErrorPage/></ErrorWrapper>}
    {!error && tweetStatus === 'idle' ?
<>
{currentTweet.tweet.retweetFrom ?  <Retweeted> <FiRepeat/> {currentTweet.tweet.retweetFrom.displayName} Remeowed</Retweeted> : ""}
<HeaderWrapper>
    <Avatar src={currentTweet.tweet.author.avatarSrc}/>
    <NameWrapper>
        <DisplayName to={`/${currentTweet.tweet.author.handle}`}>
        {currentTweet.tweet.author.displayName}
        </DisplayName>
        <Username>
        @{currentTweet.tweet.author.handle} 
        </Username>
    </NameWrapper>
</HeaderWrapper>
<TweetContents>{currentTweet.tweet.status}</TweetContents>
<TweetMedia src={currentTweet.tweet.media.length > 0 ? currentTweet.tweet.media[0].url : ''}/>
<Timestamp>{timeStampFormat} Critter web app</Timestamp>
<Divider />
<ActionBar isLiked={currentTweet.tweet.isLiked} id={currentTweet.tweet.id} handle={currentTweet.tweet.author.handle} numLikes={currentTweet.tweet.numLikes}
/>
<Divider />
</> : tweetStatus === 'loading' && !error && <CircleWrapper><CircularProgress/></CircleWrapper>}
</Wrapper>
</Main>
)}

const Wrapper = styled.div`
background: white;
width: 580px;
padding: 16px;
text-align: left;
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Ubuntu, "Helvetica Neue", sans-serif;
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

const CircleWrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;`

const ErrorWrapper = styled.div`
display: absolute;
margin-left: 100px; `

const HeaderWrapper = styled.header`
  display: flex;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const NameWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;

const DisplayName = styled(NavLink)`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  text-decoration: none;
  color: black;
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

const Main = styled.div`
`

const TweetMedia = styled.img`
height: 400px;
margin-top: 10px;
border-radius: 20px;
`

const Retweeted =  styled.div`
color: rgb(101, 119, 134);
font-size: 16px;
padding-bottom: 16px;`


export default TweetDetails;
