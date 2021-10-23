import React from "react";
import {ListGroup} from "react-bootstrap";

export default function SideBar(props) {
    const {items} = props;

    return (
        <div style={{backgroundColor: "#343a40", height: "100vh"}}>
            <ListGroup>
                {
                    items.map(item => (
                        <ListGroup.Item action onClick={item.onClick} className={"bg-dark text-light"}>
                            {item.label}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>

    );
}