import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import Spinner from "react-spinkit";

function Login({ loading }) {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  const colorOptions = [
    "deepskyblue",
    "hotpink",
    "orangered",
    "orange",
    "purple",
  ];

  return (
    <LoginContainer>
      <InnerLoginContainer>
        <img
          src="https://res.cloudinary.com/moh-x/image/upload/v1630346837/projects/slack02/slack_kye1gv.jpg"
          alt="slack logo"
        />
        {loading ? (
          <Spinner
            name="ball-triangle-path"
            color={
              colorOptions[Math.floor(Math.random() * colorOptions.length)]
            }
            className="spinner"
            fadeIn="none"
          />
        ) : (
          <>
            <h1>Sign in to The Whispers</h1>
            <p>xodeeq.netlify.com</p>

            <Button onClick={signIn}>Sign in with Google</Button>
          </>
        )}
      </InnerLoginContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.main`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const InnerLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }

  > .spinner {
    align-self: center;
    margin-top: 50px;
    color: purple;
  }
`;
