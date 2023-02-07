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
                        This neural network is set up to classify the MNIST handwritten images dataset
                        by using only 1 fully-connected, hidden layer. The models are built with Keras
                        on TensorFlow to easily deploy the models. The hidden layer has 128 neurons and
                        the network trains through backpropagation using the Adam optimizer. Each training
                        epoch uses 125 images per batch for each loss gradient calculation until it gets
                        through the 54,000 training images. There are also 6,000 validation images used
                        during training and an additional 10,000 images used for testing after training.
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
