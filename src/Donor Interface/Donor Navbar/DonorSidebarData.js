import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const DonorSidebarData = [
  {
    title: "Home",
    path: "Homepage",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Donate Now",
    path: "AddDonation",
    icon: <BiIcons.BiDonateHeart />,
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
