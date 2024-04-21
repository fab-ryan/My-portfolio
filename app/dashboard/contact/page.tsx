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
import { themes } from '@/utils';
import { useGetQueriesQuery } from '@/redux';
import { Suspense } from 'react';

export default function Contacts() {
  const { data, isLoading,  } = useGetQueriesQuery(null);

  return (
      <Container>
        <HeaderContent>
          <div className='titles'>
            <Text transformed='capitalize'>Contacts</Text>
            <Text
              className='sm'
              transformed='capitalize'
            >
              Manage your contacts
            </Text>
          </div>
        </HeaderContent>
        <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <Content>
          <Table tdHeaders={['#', 'Name', 'Email', 'Message', 'Action']}>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <LoadingIcon className='margin-auto' />
                  </td>
                </tr>
              ) : (
                data?.data?.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Content>
        </Suspense>
      </Container>
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

  .margin-auto {
    margin: 0 auto;
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
