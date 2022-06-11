import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MockData } from "../common/MockData";
import { MockDataTS } from "../interfaces/MockDataTS";

export default function BrowseRecipes(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<MockDataTS>();

  function handleModal(data: MockDataTS) {
    setShowModal(true);
    setModalData(data);
  }

  return (
    <div className="p-4">
      <h1>Browse Recipes</h1>
      {MockData.map((data: MockDataTS) => (
        <>
          <div className="m-3 p-3 border w-50">
            <h3>{data.title}</h3>
            <Button onClick={() => handleModal(data)}>Avaa</Button>
          </div>
        </>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData?.instructions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Sulje
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
