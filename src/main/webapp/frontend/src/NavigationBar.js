import React, {useState} from 'react';
//import "bootstrap/dist/css/bootstrap.css"
import {useHistory} from 'react-router-dom'
import {Button, Nav, Navbar} from "react-bootstrap";
import Link from "react-router-dom/Link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import FormControl from "react-bootstrap/FormControl";


function NavigationBar() {
    const [keyword, setKeyword] = useState("");
    const history = useHistory();
    const searchStyle = {
        background: "none",
        border: "1px solid #3d7abf",
        borderRadius: 0,
        boxShadow: "none",
        outline: "none",
        color: "#4e76b8",
        width: "250px",

    }
    const changeKeyWord = (e) => {
        setKeyword(e.target.value);
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand"><FontAwesomeIcon icon={faBookOpen}/>     BookLatia
            </Link>
            <Nav className="mr-auto">
                <Button variant={"link"} className="nav-link" onClick={() =>{history.push('/add')}}>Add Book</Button>
                <Button variant={"link"} className="nav-link" onClick={() =>{history.push('/list')}}>Book List</Button>
                <Button variant={"link"} className="nav-link" onClick={() =>{history.push('/about')}}>About</Button>
            </Nav>
            <FormControl type={"text"}
                         style={searchStyle}
                         placeholder={"Search Book"}
                         onChange={changeKeyWord}/>
            <Button variant={"primary"} onClick={() => history.push(`/search/${keyword}`)} style={{marginLeft: "10px"}}>
                Search
            </Button>
        </Navbar>
    );
}

export default NavigationBar;