import portfolio_1 from '@/assets/images/portfolio_1.png';
import portfolio_2 from '@/assets/images/portfolio_2.png';
import { StaticImageData } from 'next/image';

type Education = {
  id: number;
  title: string;
  institution: string;
  year: string;
  description: string;
};

export const myEducations: Education[] = [
  {
    id: 2,
    title: 'Bachelor of Science in Information Technology',
    institution: 'UNIVERSITY OF Kigali',
    year: '2023 - present',
    description:
      "I am currently pursuing a bachelor's degree in Information Technology at the University of Kigali. I am learning advanced computer science and programming concepts, and I am also learning how to develop and implement complex software and web applications.",
  },
  {
    id: 1,
    title: 'Diploma in Information Technology',
    institution: 'IRPC TUMBA',
    year: '2018 - 2021',
    description:
      'I graduated  with a diploma in Information Technology from IRPC TUMBA.   I learned the basics of computer science and programming,  and I also learned how to use various software and tools for web development and design.',
  },

  {
    id: 0,
    title: 'High School Diploma',
    institution: 'APPEGA GAHENGERI',
    year: '2014 - 2017',
    description:
      'I graduated from APPEGA GAHENGERI with a high school diploma. I learned the basics of computer science and programming, and I also learned how to use various software and tools for web development and design.',
  },
];

type Skill = {
  id: number;
  name: string;
  percentage: number;
};

export const mySkills: Skill[] = [
  {
    id: 0,
    name: 'HTML',
    percentage: 90,
  },
  {
    id: 1,
    name: 'CSS',
    percentage: 80,
  },
  {
    id: 2,
    name: 'JavaScript',
    percentage: 70,
  },
  {
    id: 3,
    name: 'React',
    percentage: 60,
  },
  {
    id: 4,
    name: 'Node.js',
    percentage: 50,
  },
  {
    id: 5,
    name: 'MongoDB',
    percentage: 40,
  },
  {
    id: 6,
    name: 'Python',
    percentage: 30,
  },
  {
    id: 7,
    name: 'C++',
    percentage: 20,
  },
  {
    id: 8,
    name: 'Java',
    percentage: 10,
  },
];

type ProjectCategory = {
  id: number;
  name: string;
};

export const Categories: ProjectCategory[] = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Backend',
  },
  {
    id: 3,
    name: 'Frontend',
  },
  {
    id: 4,
    name: 'Fullstack',
  },
  {
    id: 5,
    name: 'Mobile',
  },
  {
    id: 6,
    name: 'Desktop',
  },
  {
    id: 7,
    name: 'Web',
  },
];

export type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string | StaticImageData;
  url?: string;
};

export const myProjects: ProjectType[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    category: 'Frontend',
    description:
      'I developed a responsive e-commerce website using HTML, CSS, and JavaScript. The website is fully responsive and works on all devices.',
    imageUrl: portfolio_1,
  },
  {
    id: 2,
    title: 'Online Food Delivery App',
    category: 'Frontend',
    description:
      'I developed a responsive online food delivery app using React. The app is fully responsive and works on all devices.',
    imageUrl: portfolio_2,
  },
  {
    id: 3,
    title: 'Blog Website',
    category: 'Frontend',
    description:
      'I developed a responsive blog website using HTML, CSS, and JavaScript. The website is fully responsive and works on all devices.',
    imageUrl: portfolio_1,
  },
  {
    id: 4,
    title: 'Social Media App',
    category: 'Fullstack',
    description:
      'I developed a responsive social media app using React and Node.js. The app is fully responsive and works on all devices.',
    imageUrl: portfolio_2,
  },
  {
    id: 5,
    title: 'E-commerce Website',
    category: 'Backend',
    description:
      'I developed a responsive e-commerce website using Node.js and MongoDB. The website is fully responsive and works on all devices.',
    imageUrl: portfolio_1,
  },
];

export type BlogType = {
  image: string | StaticImageData;
  title: string;
  preview: string;
  url: string;
  likes: number;
  comments: number;
};

export const myBlogs: BlogType[] = [
  {
    image: portfolio_1,
    title: 'How to use the latest version of Xcode',
    preview:
      'Make sure you are using the latest version of Xcode. If not, consider updating Xcode to the latest version available',
    url: 'https://www.google.com',
    likes: 100,
    comments: 50,
  },
  {
    image: portfolio_2,
    title: 'How to use the latest version of Xcode',
    preview:
      'Make sure you are using the latest version of Xcode. If not, consider updating Xcode to the latest version available',
    url: 'https://www.google.com',
    likes: 100,
    comments: 50,
  },
  {
    image: portfolio_1,
    title: 'How to use the latest version of Xcode',
    preview:
      'Make sure you are using the latest version of Xcode. If not, consider updating Xcode to the latest version available',
    url: 'https://www.google.com',
    likes: 100,
    comments: 50,
  },
];
