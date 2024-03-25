'use client';
import {
  Button,
  DashboardLayouts,
  Table,
  Image,
  Text,
  LoadingIcon,
} from '@/components';
import styled from 'styled-components';
import portfolio_1 from '@/assets/images/portfolio_1.png';

import { useRouter } from 'next/navigation';
import { themes } from '@/utils';
import { useGetProjectsQuery } from '@/redux';

export default function SKills() {
  const router = useRouter();
  const { data, isLoading } = useGetProjectsQuery({ status: false });
  return (
    <DashboardLayouts>
      <Container>
        <HeaderContent>
          <div className='titles'>
            <Text transformed='capitalize'>Projects</Text>
            <Text
              className='sm'
              transformed='capitalize'
            >
              Manage your projects
            </Text>
          </div>

          <Button onClick={() => router.push('/dashboard/projects/create')}>
            Create Project
          </Button>
        </HeaderContent>
        <Content>
          <Table
            tdHeaders={['#', 'Title', 'Description', 'Url', 'image', 'Action']}
          >
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6}>
                    <LoadingIcon  className='margin-auto'/>
                  </td>
                </tr>
              )}
              {data?.data?.map((project, index) => (
                <tr key={project._id}>
                  <td>{index + 1}</td>
                  <td style={{width:'10%'}}>{project.title}</td>
                  <td style={{width:'10%'}}>
                    {project.description.split(' ').slice(0, 3).join(' ')}
                  </td>
                  <td style={{width:'10px'}}>{project.url}</td>
                  <td>
                    <ImageContainer>
                      <Image
                        src={project.image}
                        alt={project.title}
                        objectFit='contain'
                        layout='responsive'
                        height={400}
                        width={400}
                      />
                    </ImageContainer>
                  </td>
                  <td className='actions'>
                    <Button
                      onClick={() =>
                        router.push(`/dashboard/projects/${project._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Container>
    </DashboardLayouts>
  );
}

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  .titles {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1rem !important;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  button {
    width: 200px;
    align-self: center;
    margin-top: 2rem;
  }
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
  @media (max-width: 767px) {
    padding: 2rem 0rem;
    order: 2;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;

  .actions {
    display: flex;
    gap: 10px;
    flex-direction: row;
  }
  .margin-auto {
    margin: auto;
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 50px;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 auto;
  position: relative;

  img {
    width: 100%;
    height: 100% !important;
    object-fit: cover;
    object-position: center;
  }
`;
