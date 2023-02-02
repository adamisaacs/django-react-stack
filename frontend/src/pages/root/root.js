import {
    Outlet,
    useNavigation,
    Link,
} from 'react-router-dom';
import {
    LinkContainer
} from 'react-router-bootstrap';

import {
    Container,
    Nav,
    Navbar,
    Image,
} from 'react-bootstrap';

import './root.css';
import logo from '../../logo.svg';
import reactbootstraplogo from './reactbootstrap-logo.svg';
import reactlogo from './react-logo.svg';
import djangologo from './django-logo.svg';


export default function Root() {
    const navigation = useNavigation();

    return (
        <>
        <Container id='sidebar' className='d-flex flex-column justify-content-between border-end shadow'>
            <Navbar expand="sm" className='flex-column py-5'>
                <LinkContainer to="">
                    <Navbar.Brand className='me-0 p-0'>
                        <Image
                            src={logo}
                            width="45"
                            height="45"
                            alt="AI logo"
                        />
                    </Navbar.Brand>
                </LinkContainer>
                <Nav className='flex-column'>
                    <LinkContainer to=''>
                        <Nav.Link className='fs-5 px-0'>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='apps'>
                        <Nav.Link className='fs-5 px-0'>Apps</Nav.Link>
                    </LinkContainer>
                    <Container className='px-3'>
                        <LinkContainer to='apps/ttt'>
                            <Nav.Link className='fs-5 px-0'>TTT</Nav.Link>
                        </LinkContainer>
                    </Container>
                </Nav>
            </Navbar>
            <Container id='made-with' className='py-2 border-top'>
                <Container className='d-flex justify-content-center align-items-center'>
                    <Link className='me-2' to='https://www.djangoproject.com/'>
                        <Image src={djangologo} height='20' />
                    </Link>
                    <Link className='me-2' to='https://reactjs.org/'>
                        <Image src={reactlogo} height='20' />
                    </Link>
                    <Link to='https://react-bootstrap.github.io/'>
                        <Image src={reactbootstraplogo} height='20' />
                    </Link>
                </Container>
            </Container>
            <Container
                id='sidebar-toggle'
                className='d-flex d-md-none w-auto bg-light border border-start-0 border-dark fs-1 position-absolute fw-semibold p-2 lh-1 justify-content-center align-items-center'
                onClick={(event) => {
                    const sidebar = document.getElementById('sidebar');
                    sidebar.classList.toggle('open');
                }}
            >
                &#9776;
            </Container>
        </Container>
        <Container fluid
            id='detail'
            className={
                'px-0 flex-grow-1' +
                (navigation.state === 'loading' ? 'loading' : '')
            }
        >
            <Outlet />
        </Container>
        </>
    );
}