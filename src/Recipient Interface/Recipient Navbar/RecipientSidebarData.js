import React from "react";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const RecipientSidebarData = [
  {
    title: "Home",
    path: "HomePage",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Collect Now",
    path: "CollectDonation",
    icon: <GiIcons.GiReceiveMoney />,
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
