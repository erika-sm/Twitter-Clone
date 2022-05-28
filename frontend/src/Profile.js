import React from "react";
import styled from "styled-components";
import { GeneralContext } from "./GeneralContext";
import CircularProgress from "@mui/material/CircularProgress";
import {FiMapPin, FiCalendar} from "react-icons/fi";
import moment from 'moment';
import { useParams } from "react-router-dom";
import FeedTweet from "./FeedTweet";
import ErrorPage from "./ErrorPage";

const Profile = () => {

const { profileId } = useParams();

const { userProfile, profileFeed, error, feedStatus, profileStatus, fetchProfile, fetchFeed, currentUser} = React.useContext(GeneralContext);


let date = '';


React.useEffect(() => {
  fetchProfile(`/api/${profileId}/profile`);
}, [profileId]);


React.useEffect(() =>{
fetchFeed(`/api/${profileId}/feed`)}, [profileId]);


if(profileStatus === 'idle' && feedStatus === 'idle' && !error ){
date= moment(`${userProfile.profile.joined}`).format("MMMM YYYY");
}

return (
    <WrapperWhole>
       {error && <ErrorWrapper><ErrorPage/></ErrorWrapper>}
       {profileStatus === 'loading' || feedStatus === 'loading' && <CircularProgress/>}
    <ProfileDetails>
        {profileStatus === 'idle' && feedStatus === 'idle' && !error && (
        <>
            <Banner src={userProfile.profile.bannerSrc}/>
            <Avatar src={userProfile.profile.avatarSrc} />
            <DisplayName>{userProfile.profile.displayName}</DisplayName>
            <Handle>@{userProfile.profile.handle}</Handle>
            <Bio>{userProfile.profile.bio}</Bio>
            <Wrapper><FiMapPin/> {userProfile.profile.location} &nbsp;&nbsp;&nbsp; <FiCalendar/> Joined {date} </Wrapper>
            <Wrapper><strong>{userProfile.profile.numFollowing}</strong> Following &nbsp;&nbsp;&nbsp; <strong>{userProfile.profile.numFollowers}</strong> Followers</Wrapper>
        </>
        ) }
  </ProfileDetails>
  <TweetFeed>
{feedStatus === 'idle' && profileStatus === 'idle' && !error &&  profileFeed.tweetIds.map((id) => (
  
        <FeedTweet
          key={id}
          id={profileFeed.tweetsById[id].id}
          status={profileFeed.tweetsById[id].status}
          handle={profileFeed.tweetsById[id].author.handle}
          displayName={profileFeed.tweetsById[id].author.displayName}
          avatarSrc={profileFeed.tweetsById[id].author.avatarSrc}
          mediaSrc={ profileFeed.tweetsById[id].media.length > 0 ? profileFeed.tweetsById[id].media[0].url : '' }
          timestamp={profileFeed.tweetsById[id].timestamp}
          retweetedFrom={profileFeed.tweetsById[id].retweetFrom ? profileFeed.tweetsById[id].retweetFrom.displayName : ''}
          isLiked={profileFeed.tweetsById[id].isLiked}
          isRetweeted={profileFeed.tweetsById[id].isRetweeted}
          numRetweets={profileFeed.tweetsById[id].numRetweets}
          numLikes={profileFeed.tweetsById[id].numLikes}
      />))}
      </TweetFeed>
  </WrapperWhole>
)}

const ErrorWrapper = styled.div`
margin-left: 100px;
`

const WrapperWhole = styled.div`
border-left: solid;
border-right: solid;
border-color: lightgrey;  

`

const ProfileDetails = styled.div`
width: 900px;
`;

const Avatar = styled.img`
border-radius: 50%;
height: 200px;
border: solid;
border-width: 5px;
border-color: white;
position: relative;
top: 250px;
margin-left: 10px;
`;

const Banner = styled.img`
width: 75%;
height: 400px;
width: 900px;
position: absolute;
`

const DisplayName = styled.div`
font-weight: bold;
font-size: 25px;
position: relative;
top: 250px;
margin-left: 10px;
`

const Handle = styled.div`
position: relative;
top: 250px;
font-size: 18px;
margin-left: 10px;`

const Bio = styled.p`
position: relative;
top: 250px;
width: 600px;
font-size: 18px;
left: 10px;`

const Wrapper = styled.div`
position: relative;
top: 250px;
margin-bottom: 20px;
margin-left: 10px;`

const TweetFeed = styled.div`
position: absolute;
top: 675px; 
border-left: solid;
border-right: solid;
width: 900px;
border-color: lightgrey;  `

export default Profile;
