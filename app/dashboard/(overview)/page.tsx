'use client';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { themes, SideBarLinks, NavLinks } from '@/utils';
import { DashboardLayouts, Text } from '@/components';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Text colored>Dashboard</Text>
        <CardStaticsContainer>
          <CardStatics />
          <CardStatics />
          <CardStatics />
        </CardStaticsContainer>
        <BrowserStaticsContainer>
          <Text colored>Browser</Text>
          <BrowserStatics />
        </BrowserStaticsContainer>
      </Container>
    </Suspense>
  );
}

const CardStatics = () => {
  return (
    <Card>
      <CardTitle>Visitors</CardTitle>
      <CardValue>5,678</CardValue>
    </Card>
  );
};

const BrowserStatics = () => {
  return <Card></Card>;
};

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

const CardStaticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: 1fr;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Card = styled.div`
  padding: 20px;
  background: ${themes.tertiary};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  color: ${themes.text};
  margin-bottom: 20px;
`;

const CardValue = styled.h1`
  color: ${themes.text};
`;

const BrowserStaticsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
`;
