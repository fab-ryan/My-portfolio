import { GoHome } from 'react-icons/go';
import { VscFileSubmodule } from 'react-icons/vsc';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineContactPhone } from 'react-icons/md';
import { GrBlog } from 'react-icons/gr';
import { IoCodeSlashSharp } from 'react-icons/io5';
import { GrServices } from 'react-icons/gr';
import { FaGraduationCap } from 'react-icons/fa6';
import {MdCategory } from 'react-icons/md'

export const NavLinks: {
  name: string;
  url: string;
  icon?: React.ReactElement;
}[] = [
  {
    name: 'Home',
    url: '#home',
    icon: <GoHome />,
  },
  {
    name: 'About',
    url: '#about',
    icon: <IoMdInformationCircleOutline />,
  },
  {
    name: 'Portfolio',
    url: '#portfolio',
    icon: <VscFileSubmodule />,
  },
  {
    name: 'Blog',
    url: '#blog',
    icon: <GrBlog />,
  },
  {
    name: 'Contact me',
    url: '#',
    icon: <MdOutlineContactPhone />,
  },
];

export const SideBarLinks: {
  name: string;
  url: string;
  icon?: React.ReactElement;
}[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: <GoHome />,
  },
  {
    name: 'Blogs',
    url: '/dashboard/blogs',
    icon: <GrBlog />,
  },
  {
    name: 'Skills',
    url: '/dashboard/skills',
    icon: <IoCodeSlashSharp />,
  },
  {
    name:'Category',
    url:'/dashboard/category',
    icon:<MdCategory />
  },
  {
    name: 'Projects',
    url: '/dashboard/projects',
    icon: <VscFileSubmodule />,
  },
  {
    name: 'Contact',
    url: '/dashboard/contact',
    icon: <MdOutlineContactPhone />,
  },
  {
    name: 'Services',
    url: '#',
    icon: <GrServices />,
  },
  {
    name: 'Education',
    url: '#',
    icon: <FaGraduationCap />,
  },
];
