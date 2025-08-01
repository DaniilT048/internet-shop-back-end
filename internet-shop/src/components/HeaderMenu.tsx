import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import type {JSX} from "react";
import routes from "../routes.tsx";
import { CgGym } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom"
import {BsCart4} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {Badge, Offcanvas} from 'react-bootstrap';
import type {RootState} from '../store/store';
import Button from "react-bootstrap/Button";
import {logoutUser} from "../store/authSlice.ts";

function HeaderMenu(): JSX.Element {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                                        className="position-absolute top-0 start-100 translate-middle">
                                        {totalQuantity}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link  as={NavLink} to="/profile">
                                        {user.username}
                                    </Nav.Link>
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            dispatch(logoutUser());
                                            navigate('/');
                                        }}
                                        style={{ color: 'white', textDecoration: 'none' }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default HeaderMenu;

