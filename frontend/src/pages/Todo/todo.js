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
                        Add, edit, and delete items from the to-do list and keep track of your goals. This is the
                        first web app I wrote with my own API from Django being consumed by a React page.
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