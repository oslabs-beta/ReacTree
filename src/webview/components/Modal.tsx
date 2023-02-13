import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

type ModalProps = {
  modalActive: boolean;
  handleModal: () => void;
  fileContent: string;
};

const Modal = (props: ModalProps) => {
  const { modalActive, handleModal, fileContent } = props;

  if (!modalActive) {
    return null;
  }

  const lines = fileContent.split('\n');
  let startLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('return')) {
      startLine = i + 1;
      break;
    }
  }

  const result = lines
    .slice(startLine, startLine + 1)
    .join('')
    .trim();

  console.log('COMP', result);

  // let component = eval(fileContent);
  return (
    <div className='modal' >
      <div className="closeModal">
        <p onClick={handleModal}>X</p>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: result }} /> */}
      <LiveProvider code={result}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  );
};

export default Modal;
