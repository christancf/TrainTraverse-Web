import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function ActionModal({ functions }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => props.setOpenModal("default")}
      >
        Actions
      </div>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Actions</Modal.Header>
        <Modal.Body>
          <div className="flex gap-4">
            {functions.map((func) => (
              <div>
                //button name is not showing check this.
                <Button onClick={() => func.functionName(22)}>{func.buttonName}</Button>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
