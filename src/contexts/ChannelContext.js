import { createContext, useState } from "react";

const ChannelContext = createContext();

function ChannelContextProvider(props) {
	const [channel, setChannel] = useState("general");

	return (
		<ChannelContext.Provider value={{ channel, setChannel }}>
			{props.children}
		</ChannelContext.Provider>
	);
}

export default ChannelContextProvider;

export { ChannelContext };
