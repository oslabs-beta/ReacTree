import * as React from "react";
import * as Modal from 'react-modal';
import { useState } from "react";

const LiveRenderModal = (itemID: string) => {
//   console.log('made it here');
  console.log('itemid', itemID);
//   const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//     },
//   };

//   const [showModal, setShowModal] = useState(true);

//   const handleCloseModal = () => {
//     setShowModal(false)
//   };

//   return(
//     <div>
//       <Modal
//         isOpen={showModal}
//         onRequestClose={handleCloseModal}
//         style={customStyles}
//         contentLabel="Example Modal">
//         <p>{itemID}</p>
//         <button onClick={handleCloseModal}>close</button>
//         <div>I am a modal</div>
//         <form>
//           <input />
//           <button>tab navigation</button>
//           <button>stays</button>
//           <button>inside</button>
//           <button>the modal</button>
//         </form>
//       </Modal>
//     </div>
//   )
}

export default LiveRenderModal;