import { useRef } from 'react';
import { Button } from './Button';
import styled from 'styled-components';

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const { show, handleClose, handleDelete, title, message } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    show && (
      <ModalContainer
        ref={modalRef}
        onClick={(e) => {
          if (e.target === modalRef.current) {
            handleClose();
          }
        }}
      >
        <div>
          <h3>{message}</h3>
          <p>{title}</p>
          <div className='buttons'>
            <Button
              onClick={() => handleDelete()}
              disabled={props.loading}
            >
              Yes
            </Button>
            <Button onClick={() => handleClose()}>No</Button>
          </div>
        </div>
      </ModalContainer>
    )
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  div {
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: 0.3s;
    animation: slideUp 0.3s ease;

    @keyframes slideUp {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .buttons {
      display: flex;
      gap: 20px;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    button {
      align-self: center;
    }
    button:last-child {
      background: #4f0606;
      color: white;
    }

    h3 {
      font-size: 1.5rem;
      text-align: center;
    }
    p {
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;
