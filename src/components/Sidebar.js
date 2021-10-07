import styled, { css } from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "./SidebarOption";
import { db } from "../firebase";

function Sidebar({ user, sidebarView, setSidebarView, isMobile }) {
  const [channels] = useCollection(db.collection("channels"));

  return (
    (!isMobile || (isMobile && sidebarView)) && (
      <SidebarContainer sidebarView={sidebarView} isMobile={isMobile}>
        <SidebarHeader>
          <SidebarInfo>
            <h2>The Whispers</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </SidebarInfo>

          <CreateIcon />
        </SidebarHeader>

        <SidebarOption Icon={InsertCommentIcon} title={"Threads"} />
        <SidebarOption Icon={InboxIcon} title={"Mentions & reactions"} />
        <SidebarOption Icon={DraftsIcon} title={"Saved Items"} />
        <SidebarOption Icon={BookmarkBorderIcon} title={"Channel browser"} />
        <SidebarOption Icon={PeopleAltIcon} title={"People & user groups"} />
        <SidebarOption Icon={AppsIcon} title={"Apps"} />
        <SidebarOption Icon={FileCopyIcon} title={"File browser"} />
        <SidebarOption Icon={ExpandLessIcon} title={"Show less"} />

        <hr />

        <SidebarOption Icon={ExpandMoreIcon} title={"Channels"} />

        <hr />

        <SidebarOption Icon={AddIcon} title={"Add channel"} addChannelOption />

        {channels?.docs.map((doc) => (
          <SidebarOption
            key={doc.id}
            id={doc.id}
            title={doc.data().name}
            setSidebarView={setSidebarView}
          />
        ))}
      </SidebarContainer>
    )
  );
}

export default Sidebar;

const SidebarContainer = styled.aside`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }

  @media screen and (max-width: 425px) {
    max-width: 100vw;
    width: 100vw;
    flex: 0.8;
  }
`;

const SidebarHeader = styled.header`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
