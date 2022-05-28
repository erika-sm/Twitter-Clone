import React from "react";
import { GiBrokenHeart } from "react-icons/gi";
import styled from "styled-components";



const ErrorPage = () => {

    return(
        <Wrapper>
        <GiBrokenHeart size={50}/>
        <Error>An unknown error has occured.</Error>
        <ErrorSolution>Please try refreshing the page, or contact support if the problem persists.</ErrorSolution>
        </Wrapper>
    )

};

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 200px;
width: 700px;
`
const Error = styled.div`
font-size: 30px;
margin-top: 20px;
margin-bottom: 20px;
font-weight: bold;`

const ErrorSolution = styled.div`
font-size: 20px;
`


export default ErrorPage;