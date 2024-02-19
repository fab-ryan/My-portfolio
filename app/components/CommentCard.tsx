import { themes } from '@/utils/theme';
import styled from 'styled-components';

export const CommentCard = () => {
  return (
    <CommentContainer>
      <CommentHeader>
        <div className='logo'>H</div>
        <div className='name_date'>
          <div className='name'>Habimana</div>
          <div className='date'>12/12/2021</div>
        </div>
      </CommentHeader>
      <div className='comment'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
        voluptates.
      </div>
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
    color:${themes.tertiary};
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
    background:linear-gradient(135deg,#00657e 0%,#10131a 100%);
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
