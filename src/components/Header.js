import styled, { css } from "styled-components";
import { Avatar } from "@material-ui/core";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { auth } from "../firebase";
import { useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";

function Header({ user, sidebarView, setSidebarView, isMobile }) {
	const { channel } = useContext(ChannelContext);

	return (
		<HeaderContainer>
			<HeaderLeft isMobile={isMobile}>
				{sidebarView || !isMobile ? (
					<>
						<UserAvatar
							src={user?.photoURL}
							alt={user?.displayName}
							onClick={() => auth.signOut()}
						/>
						{/* <AccessTimeIcon /> */}
					</>
				) : (
					<ArrowBackIosIcon onClick={() => setSidebarView(true)} />
				)}
			</HeaderLeft>

			<HeaderCenter>
				<SearchIcon />
				<input type='text' placeholder={`Search ${channel}`} />
			</HeaderCenter>

			<HeaderRight>
				{/* TODO: link this to a guide component */}
				<HelpOutlineIcon />
			</HeaderRight>
		</HeaderContainer>
	);
}

export default Header;

const HeaderContainer = styled.header`
	display: flex;
	position: fixed;
	width: 100%;
	height: 40px;
	align-items: center;
	justify-content: space-between;
	padding: 10px 0;
	background-color: var(--slack-color);
	color: white;
`;

const HeaderLeft = styled.div`
	flex: 0.3;
	display: flex;
	align-items: center;
	margin-left: 20px;

	> .MuiSvgIcon-root {
		${(isMobile) =>
			!isMobile &&
			css`
				display: none;
				visibility: hidden;
			`}
		margin-left: auto;
		margin-right: 30px;
	}
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;

const HeaderCenter = styled.div`
	flex: 0.4;
	opacity: 1;
	border-radius: 6px;
	background-color: #421f44;
	text-align: center;
	display: flex;
	padding: 0 50px;
	color: gray;
	border: 1px solid gray;

	> input {
		background-color: transparent;
		border: none;
		text-align: center;
		min-width: 30px;
		outline: 0; // aka none
		color: white;
	}

	@media screen and (max-width: 480px) {
		border: 0;
		background-color: transparent;
		> input {
			display: none;
			visibility: hidden;
		}

		> .MuiSvgIcon-root {
			display: none;
		}
	}
`;

const HeaderRight = styled.div`
	flex: 0.3;
	display: flex;
	align-items: flex-end;

	> .MuiSvgIcon-root {
		margin-left: auto;
		margin-right: 20px;
	}
`;
