import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import { themes } from '@/utils';

type DropzoneProps = {
  files: any;
  setFiles: any;
  label: string;
  type?: 'image' | 'pdf';
  disabled?: boolean;
};

function Dropzone(props: DropzoneProps) {
  const { files, setFiles, label, type = 'image' ,disabled } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: type === 'image' ? { 'image/*': [] } : { 'application/pdf': [] },

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles?.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files?.map((file: any) => (
    <ThumbsContainer key={file.name}>
      <Thumbs>
        {type === 'image' ? (
          <ThumbImg
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        ) : (
          <ThumbPdf src={file.preview} />
        )}
      </Thumbs>
    </ThumbsContainer>
  ));

  useEffect(() => {
    return () =>
      files?.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Container>
      <DropzoneContainer>
          <DropzoneFile {...getRootProps({})
       
      }>
          <input {...getInputProps()}
          disabled={disabled}
          />
          <label>{label}</label>
        </DropzoneFile>
      </DropzoneContainer>
      <aside>{thumbs}</aside>
    </Container>
  );
}
export { Dropzone as Upload };

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  aside {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    position: absolute;
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      margin-right: 2px;
    }
  }
`;
const DropzoneContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${themes.tertiary};
`;

const DropzoneFile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${themes.tertiary};
  border-style: dashed;
  background-color: ${themes.background};
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

const ThumbsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -16px;
  svg {
    margin-left: 2px;
  }
`;
const Thumbs = styled.div`
  display: inline-flex;
  border-radius: 2px;
  margin-bottom: 8px;
  margin-right: 8px;
  height: 108px;
  padding: 4px;
  box-sizing: border-box;
  position: relative;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  borderradius: 2px;
  border: 1px solid ${themes.tertiary};
`;

const ThumbPdf = styled.embed`
  width: 100%;
  height: 100%;
  borderradius: 2px;
  border: 1px solid ${themes.tertiary};
`;
