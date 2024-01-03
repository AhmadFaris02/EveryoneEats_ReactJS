import React from "react";
import * as AiIcons from "react-icons/ai";
import * as TfiIcons from "react-icons/tfi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const CommunitySidebarData = [
  {
    title: "Home",
    path: "HomePage",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Apply Location",
    path: "ApplyFoodbankLocation",
    icon: <TfiIcons.TfiWrite />,
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
