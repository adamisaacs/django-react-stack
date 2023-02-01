import {
    Outlet,
    useNavigation,
} from 'react-router-dom';
import {
    LinkContainer
} from 'react-router-bootstrap';

import {
    Container,
    Nav,
    Navbar,
} from 'react-bootstrap';

import './root.css';
import logo from '../logo.svg';

export default function Root() {
    const navigation = useNavigation();

    return (
        <>
        <div id='sidebar' className='p-4 border-end border-dark bg-light shadow'>
            <Navbar expand="sm" className='flex-column px-4'>
                <LinkContainer to="">
                    <Navbar.Brand className='me-0 p-0'>
                        <img
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
            <div
                id='sidebar-toggle'
                className='bg-light border border-start-0 border-dark fs-1 position-absolute fw-semibold p-2 lh-1 justify-content-center align-items-center'
                onClick={(event) => {
                    const sidebar = document.getElementById('sidebar');
                    sidebar.classList.toggle('open');
                }}
            >
                &#9776;
            </div>
        </div>
        <div
            id='detail'
            className={ 'flex-grow-1 bg-dark text-light' + (navigation.state === 'loading' ? 'loading' : '') }
        >
            <Outlet />
        </div>
        </>
    );
}