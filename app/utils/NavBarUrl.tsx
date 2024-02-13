import { GoHome } from 'react-icons/go';
import { VscFileSubmodule } from 'react-icons/vsc';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";
import { GrBlog } from "react-icons/gr";

export const NavLinks: {
  name: string;
  url: string;
  icon?: React.ReactElement;
}[] = [
  {
    name: 'Home',
    url: '#home',
    icon: <GoHome/> ,
  },
  {
    name: 'About',
    url: '#about',
    icon: <IoMdInformationCircleOutline/>
  },
  {
    name: 'Portfolio',
    url: '#',
    icon:<VscFileSubmodule/> 
  },
  {
    name: 'Blog',
    url: '#',
    icon: <GrBlog/>

  },
  {
    name: 'Contact me',
    url: '#',
    icon:<MdOutlineContactPhone/>
  },
];
