import { ServiceCard, Text } from '../components';
import { themes } from '@/utils/theme';
import styled from 'styled-components';
import { FaCode } from 'react-icons/fa';
import { FaMobileAlt } from 'react-icons/fa';
import { TbApiApp } from 'react-icons/tb';
import { BsDatabaseFill } from 'react-icons/bs';

interface Services {
  id: number;
  title: string;
  description: string;
  icon: string | React.ReactNode;
}

const services: Services[] = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'I design and develop web applications that are user-friendly, responsive, and visually appealing. I specialize in front-end and back-end development, using technologies like HTML, CSS, JavaScript, React, Node.js, and Express.',
    icon: <FaCode size={80} />,
  },
  {
    id: 2,
    title: 'Mobile Development',
    description:
      'I create mobile applications for Android and iOS platforms, leveraging technologies like React Native, Flutter, and Swift to deliver high-quality, performant, and user-friendly apps.',
    icon: <FaMobileAlt size={80} />,
  },
  {
    id: 3,
    title: 'API Development',
    description:
      'I build robust and scalable APIs that enable seamless communication between different software systems. I specialize in RESTful APIs, GraphQL, and WebSocket APIs, ensuring efficient data exchange and integration.',
    icon: <TbApiApp size={80} />,
  },
  {
    id: 4,
    title: 'Database Management',
    description:
      'I design, implement, and manage databases to store, retrieve, and manipulate data effectively. I specialize in SQL and NoSQL databases like MySQL, PostgreSQL, MongoDB, and Firebase, ensuring data security and integrity.',
    icon: <BsDatabaseFill size={80} />,
  },
];

const About = () => {
  return (
    <AboutSection id='about'>
      <ABoutSectionLeft>
        <div className='title'>
          <Text>My</Text>
          <Text colored>Services</Text>
        </div>
        <div className='description'>
          We are a team of passionate developers, designers, and marketers who
          are committed to providing innovative solutions to our clients. Our
          services include web development, mobile app development, digital
          marketing, and more. We work closely with our clients to understand
          their needs and deliver customized solutions that meet their goals.
          Whether you need a new website, a mobile app, or a digital marketing
          campaign, we have the expertise and experience to help you succeed.
        </div>
      </ABoutSectionLeft>
      {/* <ABoutSectionLeft>
        <div className='title'>
          <Text>My</Text>
          <Text colored>Services</Text>
        </div>
        <div className='description'>
          <p>
            In the realm of software development within a service-oriented
            context, my role encompasses several key responsibilities aimed at
            designing, building, and maintaining software services. This
            involves the creation of clear and efficient APIs to facilitate
            seamless communication between different components of a system. As
            part of this process, I implement microservices, breaking down
            monolithic applications into smaller, more manageable units that can
            be independently developed, deployed, and scaled. Ensuring the
            interoperability and integration of these services is crucial,
            requiring adeptness in technologies like RESTful APIs, GraphQL, and
            messaging queues.
          </p>
        </div>
      </ABoutSectionLeft> */}
      <ABoutSectionRight>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            id={service.id}
          />
        ))}
      </ABoutSectionRight>
    </AboutSection>
  );
};

export default About;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 2rem;
  padding: 0rem 2rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 1138px) {
    padding: 0rem 5rem;
  }

  @media (max-width: 768px) {
    // grid-template-columns: 1fr;
    // grid-template-rows: 1fr 1fr;
    // grid-template-areas: 'left' 'right';
    grid-template-columns: 1fr;
    grid-template-rows: max-content;
    grid-template-areas: 'left';

    padding: 0rem 1rem;
  }
`;

const ABoutSectionLeft = styled.div`
  .title {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    font-size: 3rem;
    font-weight: 900;
    color: ${themes.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .description {
    margin-top: 3rem;
    color: ${themes.tertiary};
    margin-bottom: 1rem;
    width: 100%;
    padding: 0rem 9rem;
    @media (max-width: 768px) {
      margin-top: 1rem;
    }
    @media (max-width: 576px) {
      padding: 0rem 1rem;
    }
  }
`;

const ABoutSectionRight = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  padding: 0rem 8rem;
  margin-top: 0rem;

  @media (max-width: 1138px) {
    padding: 0rem 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: max-content;

    padding: 0rem 1rem;
  }
`;
