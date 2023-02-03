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
import bootstraplogo from './bootstrap-logo.svg'
import reactbootstraplogo from './reactbootstrap-logo.svg';
import reactlogo from './react-logo.svg';
import djangologo from './django-logo.svg';

import Clock from '../../components/clock/clock';

export default function Root() {
    const navigation = useNavigation();

    return (
        <>
        <Container
            id='sidebar'
            className='d-flex flex-column justify-content-between border-end shadow bg-light'
        >
            <Navbar expand="sm" className='flex-column py-5'>
                <LinkContainer to="/">
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
                    <LinkContainer to='/'>
                        <Nav.Link className='fs-5 px-0'>
                            Home
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='apps/'>
                        <Nav.Link className='fs-5 px-0'>
                            Apps
                        </Nav.Link>
                    </LinkContainer>
                    <Container className='px-3'>
                        <LinkContainer to='apps/ttt/'>
                            <Nav.Link className='fs-5 px-0'>
                                Tic-Tac-Toe
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='apps/clock/'>
                            <Nav.Link className='fs-5 px-0'>
                                Clock
                            </Nav.Link>
                        </LinkContainer>
                    </Container>
                </Nav>
            </Navbar>
            <Container id='sidebar-footer'>
                <Container className='d-flex justify-content-center align-items-center border-top py-3 fs-5 lh-1'>
                    <Clock
                        width='100px'
                        height='100px'
                        secondWidth='2px'
                        minuteWidth='4px'
                        hourWidth='6px'
                        offset='-4px'
                        />
                </Container>
                <Container className='d-flex justify-content-center align-items-center border-top py-2 fs-5 lh-1'>
                    <i className="bi bi-house-door"></i>&nbsp;
                    <i className="bi bi-box-arrow-in-right"></i>
                </Container>
                <Container className='d-flex justify-content-center align-items-center border-top py-2'>
                    <Link className='me-2 d-flex align-items-center' to='https://www.djangoproject.com/'>
                        <Image src={djangologo} height='20' />
                    </Link>
                    <Link className='me-2 d-flex align-items-center' to='https://reactjs.org/'>
                        <Image src={reactlogo} height='20' />
                    </Link>
                    <Link className='me-2 d-flex align-items-center' to='https://react-bootstrap.github.io/'>
                        <Image src={reactbootstraplogo} height='20' />
                    </Link>
                    <Link className='d-flex align-items-center' to='https://getbootstrap.com/'>
                        <Image src={bootstraplogo} height='20' />
                    </Link>
                </Container>
            </Container>
            <Container
                id='sidebar-toggle'
                className='d-md-none w-auto bg-light border border-start-0 border-dark fs-1 position-absolute lh-1'
                onClick={(event) => {
                    const sidebar = document.getElementById('sidebar');
                    sidebar.classList.toggle('open');
                }}
            >
                &#9776;
            </Container>
        </Container>
        <Container fluid='true'
            id='detail'
            className={
                'px-0 flex-grow-1' +
                (navigation.state === 'loading' ? 'loading' : '')
            }
        >
            <Container fluid='true' className='px-0 bg-white mx-auto'>
                <Outlet />
            </Container>
        </Container>
        </>
    );
}