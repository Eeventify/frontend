import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow} className="mb-2 me-1">
          Delete event
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete this event</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are about to delete this event. Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={props.deleteFunction}>
              Delete event
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
