import styled from "styled-components";

const Button = styled.button`
width:fit-content;
min-width:80px;
height:35px;
border:none;
border-radius:5px;
margin:1rem;
cursor: pointer;
color:white;
font-size:1.2rem;
background-color:${props => (props.color || "#F82F62")};

    &:focus{
        outline:none;
    }
    &:active{
        outline:none;
       background-color:rgb(51, 52, 55);
    }
`;

export default Button;