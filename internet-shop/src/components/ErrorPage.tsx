import type {ReactElement} from "react";
import Container from "react-bootstrap/Container";

const ErrorPage = ():ReactElement => {
    return (<Container>
        <h1 style={{color: '#FF0000'}}>Something went wrong</h1>
    </Container>)
}

export default ErrorPage;