'use client';
import { Button, DashboardLayouts, Table, Image, Text } from '@/components';
import styled from 'styled-components';
import portfolio_1 from '@/assets/images/portfolio_1.png';

import { useRouter } from 'next/navigation';
import { themes } from '@/utils';

export default function SKills() {
  const router = useRouter();
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
            Create Blog
          </Button>
        </HeaderContent>
        <Content>
          <Table
            tdHeaders={['#', 'Title', 'Description', 'Url', 'image', 'Action']}
          >
            <tbody>
              <tr>
                <td>1</td>
                <td>Blog title</td>
                <td>20%</td>
                <td>20%</td>
                <td>
                  <ImageContainer>
                    <Image
                      src={portfolio_1}
                      alt='portfolio_1'
                      objectFit='contain'
                      layout='responsive'
                      height={400}
                      width={400}
                    />
                  </ImageContainer>
                </td>
                <td>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Blog title</td>
                <td>20%</td>
                <td>20%</td>
                <td>
                  <ImageContainer>
                    <Image
                      src={portfolio_1}
                      alt='portfolio_1'
                      objectFit='contain'
                      layout='responsive'
                      height={400}
                      width={400}
                    />
                  </ImageContainer>
                </td>
                <td>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Blog title</td>
                <td>20%</td>
                <td>20%</td>
                <td>
                  <ImageContainer>
                    <Image
                      src={portfolio_1}
                      alt='portfolio_1'
                      objectFit='contain'
                      layout='responsive'
                      height={400}
                      width={400}
                    />
                  </ImageContainer>
                </td>
                <td>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
              </tr>
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
    width: 150px;
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
