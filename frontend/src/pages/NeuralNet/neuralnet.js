import React from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import NeuralNetComponent from '../../components/neuralnet/neuralnet';
import { Container } from 'react-bootstrap';


export default function Todo() {
    return (
        <>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <RainbowTitle title="Neural network" thickness='3px' width='100px' />
                    <p className='fs-5'>
                        A neural network.
                    </p>
                </Container>
            </Container>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <NeuralNetComponent />
                </Container>
            </Container>
        </>
    );
}
