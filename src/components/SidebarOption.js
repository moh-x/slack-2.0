import { useContext } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { db } from "../firebase";
import { openChannel } from "../features/appSlice";
import { ChannelContext } from "../contexts/ChannelContext";

function SidebarOption({ id, Icon, title, addChannelOption, setSidebarView }) {
	const { setChannel } = useContext(ChannelContext);
	const dispatch = useDispatch();

	const addChannel = () => {
		const channelName = prompt("Please enter the channel name.");

		if (channelName) db.collection("channels").add({ name: channelName });
	};

	const selectChannel = () => {
		if (id) dispatch(openChannel({ channelId: id }));
		setSidebarView && setSidebarView(false);
	};

	return (
		<Option onClick={addChannelOption ? addChannel : selectChannel}>
			{Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<ChannelOption>
					<span>#</span>
					{title}
				</ChannelOption>
			)}
		</Option>
	);
}

export default SidebarOption;

const Option = styled.div`
	display: flex;
	font-size: 12px;
	align-items: center;
	padding-left: 2px;
	cursor: pointer;

	:hover {
		opacity: 0.9;
		background-color: #340e36;
	}

	> h3 {
		font-weight: 500;
	}

	> h3 > span {
		padding: 15px;
	}
`;

const ChannelOption = styled.h3`
	padding: 10px 0;
	font-weight: 300;
`;
