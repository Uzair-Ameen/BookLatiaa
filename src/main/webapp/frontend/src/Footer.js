import React from 'react'
import {Row, Col, Container, Navbar} from "react-bootstrap";

function Footer() {
        var fullYear = new Date().getFullYear();
        return (

            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                        <Col lg={12} className="text-center text-muted">
                            <div>
                                {fullYear} - {fullYear + 30}, All Rights Reserved by HighKing Uzair
                            </div>
                        </Col>
                </Container>
            </Navbar>
        );
    }

export default Footer;