'use client';
import { Button, DashboardLayouts } from '@/components';
import styled from 'styled-components';
import portfolio_1 from '@/assets/images/portfolio_1.png';
import { Image, Text } from '@/components';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function Blogs() {
  const router = useRouter();
  return (
    <DashboardLayouts>
      <Container>
        <HeaderContent>
          <div className='titles'>
            <Text transformed='capitalize'>Blogs</Text>
            <Text
              className='sm'
              transformed='capitalize'
            >
              Manage your blogs
            </Text>
          </div>

          <Button onClick={() => router.push('/dashboard/blogs/create')}>
            Create Blog
          </Button>
        </HeaderContent>
        <CardContainer>
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </CardContainer>
      </Container>
    </DashboardLayouts>
  );
}

const BlogCard = () => {
  return (
    <Card>
      <Image
        src={portfolio_1}
        alt='portfolio_1'
        objectFit='contain'
        layout='responsive'
        height={900}
      />
      <CardContent>
        <h3>Blog title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          tincidunt, nunc eu fermentum aliquam, elit turpis tincidunt turpis,
        </p>
      </CardContent>
      <ActionContainer>
        <FaEdit />
        <MdDelete />
      </ActionContainer>
    </Card>
  );
};

const ActionContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to left, #0e202cab, #11141aad);
  gap: 20px;
  color: white;
  height: 100%;
  padding: 0 15px;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  transform: translateX(100%);

  svg {
    font-size: 25px;
    cursor: pointer;
  }
  svg:first-child {
    color: rgb(201 119 61);
  }
  svg:last-child {
    color: #ff0000;
  }
`;

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

const CardContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: 1fr;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const Card = styled.div`
  background-color: rgb(255 255 255 / 9%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100% !important;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    ${ActionContainer} {
      transform: translateX(0%);
    }
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(255 255 255 / 9%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
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
