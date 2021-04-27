import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from "baseui/modal";

const ImageModal: React.FC<any> = ({ sheet, open }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.full}
      role={ROLE.dialog}
    >
      <ModalHeader>Sheet Title</ModalHeader>
      <ModalBody>
        <img src="file://\\064-fs02\public_data\FDC\DrawingArchive\Scanned Schools\La Cueva\Elementary Schools\Dennis Chavez\19991124-203-FAC-R\19991124-203-FAC-R-EPC2.png" />
      </ModalBody>
    </Modal>
  );
};

export default ImageModal;
