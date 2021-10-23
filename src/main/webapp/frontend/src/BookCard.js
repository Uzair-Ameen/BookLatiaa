import React, {useState} from "react";
import {Card, Container, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function BookCard(props) {

    let [hoverStyle, setHoverStyle] = useState(false);
    let cardStyle = {
        width: '189px',
        height: '325px',
        marginBottom: "20px",
    };

    let cardStyleOnHover = {
        width: '189px',
        height: '325px',
        marginBottom: "20px",
        webkitBoxShadow: '7px 13px 5px 0px rgba(0,0,0,1)',
        mozBoxShadow: '7px 13px 5px 0px rgba(0,0,0,1)',
        boxShadow: '7px 13px 5px 0px rgba(0,0,0,1)'
    }

    let titleStyle = {fontSize: "13px"}
    return (
        <Link>
        <Card onMouseEnter={() => setHoverStyle(true)}
              onMouseLeave={() => setHoverStyle(false)}
              style={(hoverStyle) ? cardStyleOnHover : cardStyle}
              bg="dark"
              text="light"
              border={hoverStyle ? "secondary" : "none"}>
            <Container style={{textAlign: "center"}}>
                <Image style={{marginTop: "10px"}} variant={"top"}
                          src={`http://localhost:8080/api/books/covers/${props.book.issbn}`}
                          width="130px" height="196px"/>
            </Container>
            <Card.Body>
                <Card.Title style={titleStyle} text={"light"}>
                    {props.book.book.name}
                </Card.Title>
                <Card.Text style={{fontSize: "21px"}} text={"light"}>
                    {props.book.book.price} pkr<br/>
                </Card.Text>
            </Card.Body>
        </Card>
        </Link>
    );

}