import React from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import ChatComponent from '../../components/chat/chat';
import { Container } from 'react-bootstrap';


export default function Chat() {
    return (
        <>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <RainbowTitle title="Chat" thickness='3px' width='100px' />
                    <p className='fs-5'>
                        Chat application.
                    </p>
                </Container>
            </Container>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <ChatComponent />
                </Container>
            </Container>
        </>
    );
}