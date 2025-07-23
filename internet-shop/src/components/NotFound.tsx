import type {ReactElement} from "react";
import Container from "react-bootstrap/Container";

const NotFound = ():ReactElement => {
    return (<Container>
        <h1 style={{color: '#FF0000'}}>Error 404. Page is not found</h1>
    </Container>)
}

export default NotFound;