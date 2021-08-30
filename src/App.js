import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chats from "./components/Chats";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login loading={loading} />
        ) : (
          <>
            <Header user={user} />
            <MainContainer>
              <Sidebar user={user} />
              <Switch>
                <Route path="/" exact>
                  <Chats user={user} />
                </Route>
              </Switch>
            </MainContainer>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const MainContainer = styled.main`
  display: flex;
  height: 100vh;
`;
