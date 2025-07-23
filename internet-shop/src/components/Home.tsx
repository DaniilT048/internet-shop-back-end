import {type ReactElement, useState} from "react";
import Container from "react-bootstrap/Container";
import {Carousel} from "react-bootstrap";
import shop1 from "../assets/shopCarousel.jpg";
import shop2 from "../assets/shopSlider2.jpg";
import shop3 from "../assets/shopSlider3.jpg";

const Home = ():ReactElement => {
    document.title = "Home";
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex:number) => {
        setIndex(selectedIndex);
    }
    return(
        <Container>
            <h1 className="text-center text">Welcome to Gym Store!</h1>

            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src={shop1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src={shop2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src={shop3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>


);
}


export default Home;