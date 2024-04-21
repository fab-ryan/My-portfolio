import styled from 'styled-components';
import { themes } from '@/utils';
import { Button } from './Button';

interface TableProps {
  children: React.ReactNode;
  tdHeaders: string[];
}
const Tables = ({ tdHeaders, children }: TableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          {tdHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      {children}
    </Table>
  );
};

export { Tables as Table };

const Table = styled.table`
  gap: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 10px;
  overflow-x: auto;
  margin-bottom: 1rem;
  border-spacing: 0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  padding: 1rem;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #666;

  thead {
    border-radius: 0.25rem;
    tr {
      th {
        border-bottom: 1px solid ${themes.tertiary};
        padding: 0.75rem;
        text-align: center;
        color: ${themes.secondary};
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 0.75rem;
        border-bottom: 1px solid ${themes.tertiary};
        text-align: center;
        color: ${themes.text};
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
  }
`;
