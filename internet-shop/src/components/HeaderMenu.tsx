import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import type {JSX} from "react";
import routes from "../routes.tsx";
import { CgGym } from "react-icons/cg";
import {Link, NavLink} from "react-router";
import {BsCart4} from "react-icons/bs";
import {useSelector} from "react-redux";
import {Badge, Offcanvas} from 'react-bootstrap';
import type {RootState} from '../store/store';

function HeaderMenu(): JSX.Element {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Navbar className="mb-5"
            expand="lg"
            collapseOnSelect
            fixed="top"
            style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(15, 15, 15, 0.75)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1000,
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-white d-flex align-items-center gap-2 fw-bold fs-4">
                    <CgGym size={36} />
                    SportShop
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    className="bg-dark text-white"
                >
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title id="offcanvasNavbarLabel">Меню</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="ms-auto text-white gap-3">
                            {routes
                                .filter((route) => route.label && route.path !== '/cart')
                                .map((route) => (
                                    <Nav.Link
                                        key={route.path}
                                        as={NavLink}
                                        to={route.path}
                                        className="nav-link-custom"
                                    >
                                        {route.label}
                                    </Nav.Link>
                                ))}

                            <Nav.Link as={NavLink} to="/cart" className="position-relative">
                                <BsCart4 size={24} />
                                {totalQuantity > 0 && (
                                    <Badge
                                        bg="danger"
                                        pill
                                        className="position-absolute top-0 start-100 translate-middle"
                                    >
                                        {totalQuantity}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link as={NavLink} to="/profile">
                                        {user ? (
                                            <img
                                                alt="avatar"
                                                width={30}
                                                height={30}
                                                className="rounded-circle"
                                            />
                                        ) : (
                                            'Profile'
                                        )}
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout">logout</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link as={NavLink} to="/login">login</Nav.Link>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default HeaderMenu;

