import React from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup, Modal } from 'react-bootstrap'

const Authentication = ({ show = false, setShow = () => { } }) => {
    console.log(show);
    const handleClose = () => {
        setShow(false);
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter phone to continue</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title="Dropdown"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item href="#">Action</Dropdown.Item>
                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control aria-label="Text input with dropdown button" />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Login</Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}

export default Authentication