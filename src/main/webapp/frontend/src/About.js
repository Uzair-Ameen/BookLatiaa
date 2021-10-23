import {Container, Jumbotron} from "react-bootstrap";
import React from 'react'

export default function About() {
        return(
            <Container>
                <Jumbotron className="bg-dark text-light">
                    <h5>About</h5>
                    <p>
                        {'          '}It's WE project and it's an Online Book Shopping site. Made By Uzair Ameen
                    </p>
                </Jumbotron>
            </Container>
        );
    }