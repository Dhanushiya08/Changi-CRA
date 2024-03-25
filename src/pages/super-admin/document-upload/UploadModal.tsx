import { Modal } from "antd";
import UploadFiles from "./UploadFiles";
type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};
const UploadModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Upload "
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <UploadFiles handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default UploadModal;
