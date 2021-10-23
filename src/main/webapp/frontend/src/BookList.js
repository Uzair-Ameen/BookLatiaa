import React, {useState, useEffect, useRef} from 'react'
import {Card, Table, Button, ButtonGroup, InputGroup, FormControl, Overlay, Tooltip, Container} from "react-bootstrap";
import Link from "react-router-dom/Link"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faTrash, faEdit, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from "./MyToast"

export default function BookList() {

    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => fetchBooks(currentPage, booksPerPage), [currentPage, totalBooks]);
    useEffect(() => fetchTotal(), [])

    const fetchBooks = (page, number) => {
        console.log("inside useEffect");
        axios.get(`http://localhost:8080/api/books/${page}/${number}`).then(
            response => {
                console.log(response.data)
                setBooks(response.data)
            }
        )
    }

    const fetchTotal = () => {
         axios.get("http://localhost:8080/api/books/allBooks").then(
            response => setTotalBooks(response.data)
        )
    }

    const deleteBook = async (bookId) => {
        await axios.delete("http://localhost:8080/api/delete/" + bookId).then(response => {
                if (response.data != null) {
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);
                }
            }
        );
        setTotalBooks(totalBooks - 1);
    };

    const formControlStyle = {
        background: "none",
        border: "1px solid #3d7abf",
        borderRadius: 0,
        boxShadow: "none",
        outline: "none",
        color: "#4e76b8",
        width: "50px"
    }

    let totalPages = Math.ceil(totalBooks / booksPerPage)
    let count = 1;
    let rows = books.map(b => (
        <tr>
            <td>
                {count++}
            </td>
            <td>
                {b.book.name}
            </td>
            <td>
                {b.book.genre}
            </td>
            <td>
                {b.book.price}
            </td>
            <td>
                {b.book.publisher}
            </td>
            <td>
                <ButtonGroup>
                    <Link to={`edit/${b.issbn}`} className="btn btn-sm btn-outline-primary">
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                    <Button size="sm" variant="outline-danger" onClick={() => deleteBook(b.issbn)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

    return (
        <Container>
            <MyToast children={{show : show, message : "Book Deleted Successfully", type : "danger"}}/>
            <Card bg="dark">
                <Card.Header className="text-light">
                    <FontAwesomeIcon icon={faList}/>    Book List
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Publisher</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            books.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan="6">No Books Available</td>
                            </tr> :
                                rows
                        }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className={"text-light"}>
                    <div style={{"float": "left"}}>
                        Showing page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float": "right"}}>
                        <InputGroup size={"sm"}>
                            <InputGroup.Prepend>
                                <Button text={"white"}
                                        variant={"outline-primary"}
                                        onClick={() => setCurrentPage(1)}>
                                    First
                                </Button>
                                <Button text={"white"}
                                        variant={"outline-primary"}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage <= 1}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl type={"number"}
                                         style={formControlStyle}
                                         value={currentPage}
                                         onChange={(e) => setCurrentPage(e.target.value)}/>
                            <InputGroup.Append>
                                <Button text={"white"}
                                        variant={"outline-primary"}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage >= totalPages}>
                                    <FontAwesomeIcon icon={faArrowRight}/>
                                </Button>
                                <Button text={"white"} variant={"outline-primary"}
                                        onClick={() => setCurrentPage(totalPages)}>
                                    Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
}