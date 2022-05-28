import {ReactComponent as LogoSrc} from './assets/logo.svg';
import styled from 'styled-components';
import {FiUser, FiHome, FiBookmark, FiBell} from "react-icons/fi";
import {NavLink} from 'react-router-dom';
import {COLORS} from './constants';
import { GeneralContext } from './GeneralContext';
import React from 'react';

const Sidebar = () => {
    const { currentUser } =
    React.useContext(GeneralContext);
    return ( 
        <Side>
            <LogoSrc style={{marginBottom: '20px'}}/>
            <NavigationLink to='/'><FiHome size={50} style={{marginRight: '13px'}}/> Home</NavigationLink>
            <NavigationLink to= { Object.keys(currentUser)?.length  > 0 ? `/${currentUser.profile.handle}` : ''} ><FiUser size={50} style={{marginRight: '13px'}}/> Profile</NavigationLink>
            <NavigationLink to='/notifications'><FiBell size={50} style={{marginRight: '13px'}}/> Notifcations</NavigationLink>
            <NavigationLink to='/bookmarks'><FiBookmark size={50} style={{marginRight: '13px'}}/> Bookmarks</NavigationLink>      
        </Side>
    )
}

const Side = styled.div`
margin-right: 30px;
margin-left: 80px;
width: 220px;
height: 100vh;
display: flex;
flex-direction: column;
`

const NavigationLink = styled(NavLink)`
margin-bottom: 30px;
display: flex;
align-items: center;
top: 50%;
color: black;
text-decoration: none;
font-size: 25px;
font-weight: bold;

&:active, &:focus, &:hover{
    background-color: #4C00FF3F;
    border-radius: 20px;
    color: ${COLORS.primary};
 }`

export default Sidebar;