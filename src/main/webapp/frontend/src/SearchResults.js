import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios'
import BookCard from "./BookCard";
import {useParams} from 'react-router-dom'


export default function SearchResult() {
    const {keyword} = useParams();
    const [books, setBooks] = useState([]);

    useEffect((() => {
        axios.get(`http://localhost:8080/api/books/search/${keyword}`).then(response => {
            setBooks(response.data)
        })
    }))

    return (
        <Container>
            <Card bg={"dark"} text={"light"}>
                <Card.Header>
                    Search Results For {keyword}
                </Card.Header>
                <Card.Body>
                    <Row noGutters={true} md={2} xs={1} lg={6}>
                        {
                            books.map(b => (
                                <Col>
                                    <BookCard book={b}/>
                                </Col>
                            ))
                        }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}