import { Comment } from '@/types';
import { themes } from '@/utils/theme';
import styled from 'styled-components';
import moment from 'moment';

export const CommentCard = (props: Comment) => {
  const { name, comment, createdAt } = props;
  const getFirstLetter = (name: string) => {
    return name.charAt(0);
  };
  return (
    <CommentContainer>
      <CommentHeader>
        <div className='logo'>{getFirstLetter(name)}</div>
        <div className='name_date'>
          <div className='name'>{name}</div>
          <div className='date'>
            {moment(createdAt).format('MMMM Do YYYY, h:mm a')}
          </div>
        </div>
      </CommentHeader>
      <div className='comment'>{comment}</div>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  gap: 0.3rem;
  margin-bottom: 1rem;

  .comment {
    font-size: 0.9rem;
    color: ${themes.tertiary};
  }
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00657e 0%, #10131a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: ${themes.secondary};
  }
  .name_date {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    .name {
      font-size: 0.8rem;
      font-weight: 600;
      color: ${themes.text};
    }
    .date {
      font-size: 0.7rem;
      color: ${themes.tertiary};
    }
  }
`;
