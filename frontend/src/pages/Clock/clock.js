import React from "react";
import { Container } from "react-bootstrap";
import ClockComponent from '../../components/clock/clock';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';


export default function Clock() {
    return (
        <>
        <Container fluid='true' className="section">
            <Container fluid='true' className="content w-75 py-5 m-auto">
            <RainbowTitle title='Circular Clock' thickness='3px' width='100px' />
                <p className='fs-5'>
                    This is the first React component I wrote on my own. It's a simple clock
                    that runs off the client's time and updates through CSS.
                </p>
            </Container>
        </Container>
        <Container fluid='true' className="section">
            <Container fluid='true' className="content w-75 py-5 m-auto">
                <ClockComponent
                    width='400px'
                    height='400px'
                    secondWidth='8px'
                    minuteWidth='16px'
                    hourWidth='24px'
                    bgColor='white'
                />
            </Container>
        </Container>
        </>
    );
}