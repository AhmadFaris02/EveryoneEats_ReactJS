import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const AdminSidebarData = [
  {
    title: "Home",
    path: "Homepage",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Approve Location",
    path: "ApproveFoodbankLocation",
    icon: <MdIcons.MdAddLocationAlt />,
    cName: "nav-text",
  },
  {
    title: "Delete Location",
    path: "DeleteLocation",
    icon: <MdIcons.MdLocationOff />,
    cName: "nav-text",
  },
  {
    title: "View Location",
    path: "ViewFoodbankLocation",
    icon: <MdIcons.MdLocationPin />,
    cName: "nav-text",
  },
  {
    title: "Feedback",
    path: "ViewFeedback",
    icon: <MdIcons.MdOutlineFeedback />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "ViewProfile",
    icon: <RiIcons.RiProfileLine />,
    cName: "nav-text",
  },
];
