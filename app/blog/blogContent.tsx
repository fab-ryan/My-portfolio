'use client';
import {
  BottomNavBar,
  NavBar,
  Text,
  Image,
  BlogCard,
  CommentCard,
  Button,
} from '@/components';
import { BlogType } from '@/types';
import { themes } from '@/utils/theme';
import styled from 'styled-components';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { IoIosThumbsUp } from 'react-icons/io';
import InputText from '@/components/InputText';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { useEffect } from 'react';
import { useGetBlogQuery } from '@/redux';

type Props = {
  slug: string;
};

export const BlogContents = (props: Props) => {
  const { slug } = props;
  const { data, isLoading } = useGetBlogQuery({ slug: slug });

  const blog: BlogType | undefined = data?.data;

  useEffect(() => {
    if (document !== undefined) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    }
  }, []);

  return (
    <Main>
      <NavBar />
      <BottomNavBar />
      <BlogSection>
        {blog && (
          <BlogContent>
            <Text
              className='title'
              transformed='capitalize'
            >
              {blog?.title}
            </Text>
            <ImageContainer>
              <Image
                src={blog?.image}
                alt={blog?.title}
                layout='responsive'
                objectFit='contain'
                width={900}
                height={900}
              />
            </ImageContainer>

            <p
              className='blog_contents'
              dangerouslySetInnerHTML={{
                __html: blog?.content,
              }}
            ></p>
            <StatisticsContainer>
              <div className='comments_Likes'>
                <div className='likes'>
                  <BiSolidMessageRounded size='1.5rem' />
                  <span>{blog.likes}</span>
                </div>
                <div className='comments'>
                  <IoIosThumbsUp size='1.5rem' />
                  <span>{blog.comments}</span>
                </div>
              </div>
              <div className='date'>
                <span>
                  Published on: {moment(blog.createdAt).format('MMMM Do YYYY')}
                </span>
              </div>
            </StatisticsContainer>
          </BlogContent>
        )}

        <RelatedComments>
          <Text
            className='title'
            transformed='capitalize'
          >
            Recent Comments
          </Text>
          <div>
            <Text
              className='title'
              transformed='capitalize'
            >
              No comments yet
            </Text>
          </div>
          <CommentContainer>
            {[1, 3, 4, 5].map((index) => (
              <CommentCard key={index} />
            ))}
          </CommentContainer>
        </RelatedComments>
        <Formik
          initialValues={{
            name: '',
            email: '',
            comment: '',
          }}
          onSubmit={(values, actions) => {}}
        >
          <CommentForm>
            <Field
              component={InputText}
              type='text'
              placeholder='Write A Name'
              name='name'
            />
            <Field
              component={InputText}
              type='email'
              placeholder='Write an email'
              name='email'
            />
            <Field
              component={InputText}
              type='textarea'
              placeholder='Write a comment'
              name='comment'
            />

            <Button>Send Comment</Button>
          </CommentForm>
        </Formik>

        <Text
          className='title left'
          transformed='capitalize'
        >
          Related Blogs
        </Text>

        <BlogRelated>
          {/* {myBlogs.slice(0, 3).map((blog, index) => (
            <BlogCard
              key={index}
              {...blog}
            />
          ))} */}
        </BlogRelated>
      </BlogSection>
    </Main>
  );
};

const Main = styled.main``;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const BlogSection = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 1rem 0;
  }

  .left {
    text-align: left;
  }
`;

const BlogContent = styled.div`
  padding: 2rem 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 2rem;
    font-weight: bold;
  }

  .blog_contents {
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: justify;
    color: ${themes.tertiary};
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;

    .title {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    .title {
      font-size: 1rem;
    }
  }
`;

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-top: 1px solid ${themes.tertiary};
  border-bottom: 1px solid ${themes.tertiary};
  padding: 1rem 0;

  .comments_Likes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .likes,
    .comments {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      color: ${themes.tertiary};

      span {
        font-size: 1rem;
        color: ${themes.tertiary};
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .date {
    span {
      font-size: 1rem;
      color: ${themes.tertiary};
    }
  }
`;

const BlogRelated = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  justify-content: center;

  gap: 1rem;
  padding: 2rem 8rem;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

const RelatedComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2rem 8rem;
  gap: 1rem;

  .title {
    font-size: 1.2rem;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;

    .title {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    .title {
      font-size: 0.8rem;
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CommentForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem 8rem;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;
