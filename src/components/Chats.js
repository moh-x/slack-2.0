import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import "firebase/firestore";
import { selectChannel } from "../features/appSlice";
import { useEffect, useRef, useContext } from "react";
import { db } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ChannelContext } from "../contexts/ChannelContext";

function Chats({ user, sidebarView }) {
	const { setChannel } = useContext(ChannelContext);
	const chatRef = useRef(null);
	const channelId = useSelector(selectChannel);
	const [channelInfo] = useDocument(
		channelId && db.collection("channels").doc(channelId)
	);

	useEffect(() => {
		setChannel(channelInfo?.data().name);
	}, [channelInfo]);

	const [channelMessages, loading] = useCollection(
		channelId &&
			db
				.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "asc")
	);

	// console.log(channelInfo?.data().name);
	// console.log(channelMessages);

	const inputRef = useRef(null);
	const sendMessage = (e) => {
		e.preventDefault(); // Prevents a page refresh.

		if (!channelId) return false;

		db.collection("channels").doc(channelId).collection("messages").add({
			message: inputRef.current.value,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: user?.displayName,
			userImage: user?.photoURL,
		});

		chatRef?.current?.scrollIntoView({ behaviour: "smooth" });

		inputRef.current.value = "";
	};

	useEffect(() => {
		chatRef?.current?.scrollIntoView({ behaviour: "smooth" });
	}, [channelId, loading]);

	return (
		!sidebarView && (
			<ChatSection>
				{channelInfo && (
					<>
						<ChatHeader>
							<HeaderLeft>
								<h4>
									<strong>#{channelInfo?.data().name}</strong>
								</h4>
								<StarBorderOutlinedIcon />
							</HeaderLeft>
							<HeaderRight>
								<p>
									<InfoOutlinedIcon /> Details
								</p>
							</HeaderRight>
						</ChatHeader>

						<ChatBody>
							{channelMessages?.docs.map((doc) => {
								const { message, timestamp, user, userImage } = doc.data();

								return (
									<Message
										key={doc.id}
										message={message}
										timestamp={timestamp}
										user={user}
										userImage={userImage}
									/>
								);
							})}
							<ChatBottom ref={chatRef} />
						</ChatBody>

						<ChatInput>
							<form>
								<input
									placeholder={`Message #${channelInfo?.data().name}`}
									ref={inputRef}
								/>
								<button hidden type='submit' onClick={sendMessage}>
									SEND
								</button>
							</form>
						</ChatInput>
					</>
				)}
			</ChatSection>
		)
	);
}

export default Chats;

const ChatSection = styled.section`
	flex: 0.7;
	flex-grow: 1;
	overflow-y: scroll;
	margin-top: 60px; ;
`;

const ChatHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;

	> h4 {
		display: flex;
		text-transform: lowercase;
	}

	> .MuiSvgIcon-root {
		margin-left: 20px;
		font-size: 18px;
	}
`;

const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	> p > .MuiSvgIcon-root {
		margin-right: 5px !important;
		font-size: 16px;
	}
`;

const ChatBody = styled.div``;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const ChatInput = styled.div`
	border-radius: 20px;
	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}

	> form > input {
		position: fixed;
		bottom: 30px;
		width: 60%;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 20px;
		outline: none;
	}
`;
