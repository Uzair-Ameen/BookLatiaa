import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, Col, Container, Form, OverlayTrigger, Popover} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from "./MyToast"
import {useHistory, useParams} from 'react-router-dom'


export default function Book() {

    const {issbn} = useParams();
    const history = useHistory();
    const initialState = {name: "", genre: "", price: 0, publisher: "", auther: "", description: ""};
    const [book, setBook] = useState(initialState);
    const [file, setFile] = useState(null);
    const [isSubmitted, setSubmitted] = useState(false);
    let reference = useRef(null);


    useEffect(() => {
            console.log("yuuu");
            console.log(issbn);
            if (issbn) {
                getBookById(issbn);
            }
            reference.current.focus();
        }, []
    );

    const getBookById = (bookId) => {
        axios.get(`http://localhost:8080/api/book/${bookId}`).then(response => {
                if (response.data != null)
                    setBook({
                            name: response.data.name,
                            genre: response.data.genre,
                            price: response.data.price,
                            publisher: response.data.publisher,
                            description: response.data.description,
                            auther: response.data.auther.name
                        }
                    );
            }
        );
        console.log(book);
    }

    const reset = () => {
        setBook(initialState);
    }

    const submitBook = (event) => {
        const bookData = {
            name: book.name,
            genre: book.genre,
            price: book.price,
            publisher: book.publisher,
            description: book.description,
            auther: {id: null, name: book.auther}
        };
        console.log(bookData);
        if (issbn != null) {
            const bookEntity = {issbn: issbn, book: bookData};
            console.log(bookEntity);
            updateBook(bookEntity);
        } else {
            console.log(bookData)
            addBook(bookData);
        }
        event.preventDefault();
    }

    const addBook = (book) => {
        console.log(book);
        axios.post("http://localhost:8080/api/add", book).then(
            response => {
                if (response.data != null) {
                    if (file != null)
                        postFile(response.data.issbn);
                    reset();
                    setSubmitted(true);
                    setTimeout(() => setSubmitted(false), 3000);
                }
            }
        );
    }

    const postFile = (name) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`http://localhost:8080/api/upload/cover/${name}`, formData, config).then(r => {
            if (r.data != null)
                console.log("image uploaded");
        })
    }

    const updateBook = async (book) => {
        console.log("updating...");
        await axios.put("http://localhost:8080/api/update", book).then(response => {
            if (response.data != null) {
                if (file != null)
                    postFile(issbn);
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    goToList();
                }, 3000);
            }
        });
    }

    const bookChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        });
    }

    const {name, genre, price, publisher, auther, description} = book;

    const goToList = () => {
        history.push('/list');
    }

    const popover = (
        <Popover className={"bg-dark text-light"}>
            <Popover.Title className={"bg-dark text-light"}>
                Submit Form
            </Popover.Title>
            <Popover.Content className={"text-light"}>
                Do you want to <strong>{issbn == null ? "submit" : "Update"}</strong> the book?
            </Popover.Content>
        </Popover>
    );

    const fileChange = (event) => {
        setFile(event.target.files[0]);
    };
    return (
        <Container>
            <MyToast children={{
                show: isSubmitted,
                message: `Book ${(issbn == null) ? "Added" : "Updated"} Successfully`,
                type: "success"
            }}/>

            <Card bg="dark">
                <Card.Header className="text-light">
                    <FontAwesomeIcon icon={faPlusSquare}/> {issbn == null ? "Add" : "Update"} Book
                </Card.Header>
                <Card.Body>
                    <Form id="formID" onSubmit={submitBook} onReset={reset}>
                        <Form.Row>
                            <Form.Group controlId="bookName" as={Col}>
                                <Form.Label className="text-light">Book Name</Form.Label>
                                <Form.Control ref={reference} required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="text"
                                              name="name"
                                              value={name}
                                              onChange={bookChange}
                                              placeholder="Enter Book Name"/>
                                <Form.Text className="text-muted">
                                    Book Name must be valid
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="bookGenre" as={Col}>
                                <Form.Label className="text-light">Genre</Form.Label>
                                <Form.Control required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="text"
                                              name="genre"
                                              value={genre}
                                              onChange={bookChange}
                                              placeholder="Enter Book Genre"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="bookPrice" as={Col}>
                                <Form.Label className="text-light">Price</Form.Label>
                                <Form.Control required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="number"
                                              name="price"
                                              value={price}
                                              onChange={bookChange}
                                              placeholder="Enter Book Price"/>
                            </Form.Group>

                            <Form.Group controlId="bookPublisher" as={Col}>
                                <Form.Label className="text-light">Publisher</Form.Label>
                                <Form.Control required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="text"
                                              name="publisher"
                                              value={publisher}
                                              onChange={bookChange}
                                              placeholder="Enter Publisher"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="bookAuther" as={Col}>
                                <Form.Label className="text-light">Auther</Form.Label>
                                <Form.Control required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="text"
                                              name="auther"
                                              value={auther}
                                              onChange={bookChange}
                                              placeholder="Enter Book Auther"/>
                            </Form.Group>
                            <Form.Group controlId="bookDescription" as={Col}>
                                <Form.Label className="text-light">Description</Form.Label>
                                <Form.Control as={"textarea"} required autoComplete="off"
                                              className={"bg-dark text-light"}
                                              type="text"
                                              name="description"
                                              value={description}
                                              onChange={bookChange}
                                              placeholder="Enter Description"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="file" as={Col}>
                                <Form.Label className="text-light">Choose Cover</Form.Label>
                                <Form.File autoComplete="off"
                                           name="cover"
                                           onChange={fileChange}
                                           className={"bg-dark text-light position-relative"}/>
                            </Form.Group>
                        </Form.Row>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{show: 250, hide: 400}}
                            overlay={popover}>
                            <Button variant="success" type="submit" size={'sm'}>
                                <FontAwesomeIcon icon={faSave}/>{' '} {issbn == null ? "Submit" : "Update"}
                            </Button>
                        </OverlayTrigger>
                        {' '}
                        <Button variant="danger" type="reset" size={'sm'}>
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>{' '}
                        <Button variant="primary" size={'sm'} onClick={goToList}>
                            <FontAwesomeIcon icon={faList}/> Book List
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}