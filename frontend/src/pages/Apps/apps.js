import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';

export default function Apps() {
    return (
        <>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Applications' thickness='3px' width='100px' />
                    <p className='fs-5'>
                        All of the webapps I have made so far are listed below.
                    </p>
                </Container>
            </Container>
            <Container fluid='true' id='apps-list' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <Container fluid='true' className="d-flex justify-content-around flex-wrap">
                        <Link to='iss/' className="text-decoration-none mb-3 me-3">
                            <Button className="button-hover fs-3 border border-dark border-3 bg-light px-4 py-3 text-dark">
                                <i className="bi bi-rocket-takeoff"></i> Where's the ISS?
                            </Button>
                        </Link>
                        <Link to='clock/' className="text-decoration-none mb-3 me-3">
                            <Button className="button-hover fs-3 border border-dark border-3 bg-light px-4 py-3 text-dark">
                                <i className="bi bi-clock"></i> Circular Clock
                            </Button>
                        </Link>
                        <Link to='ttt/' className="text-decoration-none mb-3 me-3">
                            <Button className="button-hover fs-3 border border-dark border-3 bg-light px-4 py-3 text-dark">
                                <i className="bi bi-grid-3x3"></i> Tic-Tac-Toe
                            </Button>
                        </Link>
                    </Container>
                </Container>
            </Container>
        </>
    );
}