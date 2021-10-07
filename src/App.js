import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chats from "./components/Chats";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import ChannelContextProvider from "./contexts/ChannelContext";

function App() {
	const [user, loading] = useAuthState(auth);
	const [sidebarView, setSidebarView] = useState(false);
	const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

	return (
		<div className='app'>
			<Router>
				{!user ? (
					<Login loading={loading} />
				) : (
					<ChannelContextProvider>
						<Header
							user={user}
							sidebarView={sidebarView}
							setSidebarView={setSidebarView}
							isMobile={isMobile}
						/>
						<MainContainer>
							<Sidebar
								user={user}
								sidebarView={sidebarView}
								setSidebarView={setSidebarView}
								isMobile={isMobile}
							/>
							<Switch>
								<Route path='/' exact>
									<Chats user={user} sidebarView={sidebarView} />
								</Route>
							</Switch>
						</MainContainer>
					</ChannelContextProvider>
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
