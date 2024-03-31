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
          <p>
            Additionally, I am responsible for testing and quality assurance,
            ensuring the reliability, stability, and performance of your
            services through rigorous testing practices. This includes writing
            unit tests, integration tests, and end-to-end tests, as well as
            participating in code reviews and quality assurance processes.
            Deployment and management of services in production environments
            fall under your purview as well, where collaboration with DevOps
            teams is essential for tasks such as containerization,
            orchestration, continuous integration/continuous deployment (CI/CD),
            and monitoring.
          </p>
          <p>
            Maintenance and support form another critical aspect of my role,
            involving troubleshooting issues, addressing bugs, implementing
            patches or updates, and ensuring high availability and reliability
            of services. Finally, documentation and knowledge sharing play a
            crucial role in fostering collaboration and facilitating ongoing
            improvement. Documenting code, APIs, and architectural decisions
            helps streamline collaboration within teams and across the
            organization, while knowledge-sharing sessions and documentation aid
            in disseminating insights and best practices.
          </p>
        </div>
      </ABoutSectionLeft>
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'left right';
  grid-gap: 5rem;
  padding: 0rem 7rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 1138px) {
    padding: 0rem 5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas: 'left' 'right';
    padding: 0rem 1rem;
  }
`;

const ABoutSectionLeft = styled.div`
  .title {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
  }

  .description {
    margin-top: 3rem;
    p {
      margin-bottom: 1rem;
      color: ${themes.tertiary};
    }

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }
`;

const ABoutSectionRight = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  padding: 0rem 7rem;
  margin-top: 0rem;

  @media (max-width: 1138px) {
    padding: 0rem 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    padding: 0rem 1rem;
  }
`;
