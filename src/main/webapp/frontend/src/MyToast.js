import React from 'react'
import {Toast} from "react-bootstrap";

const MyToast = (props) => {


    const toastCss = {
        position : "fixed",
        top : "10px",
        right : "10px",
        zIndex : "1",
        webkitBoxShadow: "10px 18px 18px -3px rgba(0,0,0,0.83)",
        mozBoxShadow: "10px 18px 18px -3px rgba(0,0,0,0.83)",
        boxShadow: "10px 18px 18px -3px rgba(0,0,0,0.83)"
    };
    return (
        <div style={props.children.show ? toastCss : null}>
            <Toast className={`border text-light ${props.children.type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`}
                   show={props.children.show} animation={true} delay={3000}>
                <Toast.Header className={`text-white
                    ${props.children.type === "success" ? "bg-success" : "bg-danger"}`}
                              closeButton={false}>
                    <strong className="mr-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>
                    {props.children.message}
                </Toast.Body>
            </Toast>
        </div>

    );
}

export default MyToast;