import { themes } from '@/utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface EditorProps {
  editorState: any;
  setEditorState: (state: any) => void;
  disabled?: boolean;
}

function DraftEditor({ editorState, setEditorState, disabled }: EditorProps) {
  return (
    <StyledEditor
      theme='snow'
      value={editorState}
      onChange={setEditorState}
      readOnly={disabled}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'color',
        'background',
        'script',
        'clean',
      ]}
    />
  );
}

export { DraftEditor as Editor };

const StyledEditor = styled(ReactQuill)`
  .ql-toolbar {
    background-color: ${themes.background} !important;
    border: 1px solid transparent !important;
    border-bottom: 1px solid ${themes.tertiary} !important;
  }
  .ql-container {
    height: 300px;
    border: 1px solid transparent;
  }
  .ql-editor {
    padding: 20px;
    font-size: 1rem;
    color: white;
    background-color: ${themes.background};
  }
  .ql-stroke {
    stroke: ${themes.text};
  }

  width: 100%;
  border: 1px solid ${themes.tertiary};
  border-radius: 10px;
  overflow: hidden;
`;
