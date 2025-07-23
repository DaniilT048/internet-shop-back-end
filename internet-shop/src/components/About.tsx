import Container from "react-bootstrap/Container";
import type {ReactElement} from "react";
import {Link} from "react-router-dom";

const About = ():ReactElement => {
    document.title = "About";
    return(
        <Container>
            <h1>
                About Page
            </h1>
            <p>
                Whether you're building a home gym, training for a competition, or just starting your fitness journey —
                we've got you covered.
                From dumbbells and resistance bands to professional gym machines, our wide range of products meets the
                needs of athletes, beginners, and fitness enthusiasts alike.
            </p>
            <div className="list-group">
                <Link to="/products?category=Balls" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Balls</h5>
                    </div>
                    <p className="mb-1">We have a lot of balls</p>
                </Link>
                <Link to="/products?category=Dumbbells" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Dumbbells</h5>
                    </div>
                    <p className="mb-1">We have a lot of dumbbells</p>
                </Link>
                <Link to="/products?category=Mats" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Mats</h5>
                    </div>
                    <p className="mb-1">We have a lot of mats</p>
                </Link>
                <Link to="/products?category=Accessories" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Accessories</h5>
                    </div>
                    <p className="mb-1">We have a lot of accessories</p>
                </Link>
            </div>
        </Container>
    )

}

export default About