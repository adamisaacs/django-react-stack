import React from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import TodoComponent from '../../components/todo/todo';
import { Container } from 'react-bootstrap';


export default function Todo() {
    return (
        <>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <RainbowTitle title="To-do List" thickness='3px' width='100px' />
                    <p className='fs-5'>
                        To-do list application.
                    </p>
                </Container>
            </Container>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <TodoComponent />
                </Container>
            </Container>
        </>
    );
}