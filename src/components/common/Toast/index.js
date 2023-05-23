import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap';

const Toast1 = ({ show = false, setShow = () => { } }) => {
    return (
        <ToastContainer position="middle-end" className="p-3">
            <Toast show={show} onClose={() => { setShow(false); }} delay={3000} autohide bg='warning' >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Toast1