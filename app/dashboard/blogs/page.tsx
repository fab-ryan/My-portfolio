'use client';
import { Button, DashboardLayouts, Skeletons } from '@/components';
import styled from 'styled-components';
import { Image, Text } from '@/components';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import {
  useChangeBlogStatusMutation,
  useDeleteBlogMutation,
  useGetAdminBlogsQuery,
} from '@/redux';
import { BlogType } from '@/types';
import { useSelector } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import { DeleteModal } from '@/components/DeleteModal';
import { toast } from 'react-toastify';

export default function Blogs() {
  const router = useRouter();
  useGetAdminBlogsQuery(null);
  const { data, loading } = useSelector((state) => state.blogs);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogType>();
  const [deleteBlog, loadingDeleteBlog] = useDeleteBlogMutation();

  const handleDelete = (blog?: BlogType) => {
    if (loadingDeleteBlog.isLoading) return;
    if (blog === undefined) return;
    deleteBlog({ slug: blog?.slug });
  };

  useEffect(() => {
    if (loadingDeleteBlog) {
      setShowModal(false);
      toast.success(loadingDeleteBlog?.data?.message);

    }
  }, [loadingDeleteBlog.isSuccess, loadingDeleteBlog.isLoading]);

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
          {loading ? (
            <div className='skeleton-container'>
              <Skeletons
                count={1}
                height='350px'
                width='100%'
              />
              <Skeletons
                count={1}
                height='350px'
                width='100%'
                containerClassName='flex-1'
              />
              <Skeletons
                count={1}
                height='350px'
                width='100%'
                containerClassName='flex-1'
              />
            </div>
          ) : (
            data?.data?.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                setShowModal={setShowModal}
                setSelectedBlog={setSelectedBlog}
              />
            ))
          )}
        </CardContainer>

        <DeleteModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleDelete={() => handleDelete(selectedBlog)}
          title={selectedBlog?.title ?? ''}
          message='Are you sure you want to delete this blog?'
        />
      </Container>
    </DashboardLayouts>
  );
}

type BlogCardProps = {
  blog: BlogType;
  setShowModal: (value: boolean) => void;
  setSelectedBlog: (value: BlogType) => void;
};
const BlogCard = (props: BlogCardProps) => {
  const { image, title, slug, preview, status } = props.blog;
  const router = useRouter();
  const [changeBlogStatus, loadingStates] = useChangeBlogStatusMutation();

  const handleStatusChange = () => {
    if (loadingStates.isLoading) return;
    changeBlogStatus({ slug });
  };
  return (
    <Card>
      <Status
        className={status === true ? 'active' : 'inactive'}
        onClick={handleStatusChange}
      >
        {status === true ? 'Active' : 'Inactive'}
      </Status>
      <Image
        src={image}
        alt={title}
        objectFit='contain'
        layout='responsive'
        height={900}
        width={1600}
      />
      <CardContent>
        <h3>{title}</h3>
        <p>{preview}</p>
      </CardContent>
      <ActionContainer>
        <FaEdit onClick={() => router.push(`/dashboard/blogs/${slug}`)} />
        <MdDelete
          onClick={() => {
            props.setShowModal(true);
            props.setSelectedBlog(props.blog);
          }}
        />
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
  gap: 30px;
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
  .skeleton-container {
    display: inline-grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-template-rows: 1fr;
    gap: 20px;
  }
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
  color: white;
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

const Status = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to left, #0e202cab, #11141aad);
  gap: 20px;
  color: white;
  padding: 5px 15px;
  justify-content: center;
  backdrop-filter: blur(10px);
  border-radius: 10px;

  transition: all 0.3s ease;
  &.active {
    color: green;
  }
  &.inactive {
    color: red;
  }

  &:hover {
    cursor: pointer;
  }
`;
