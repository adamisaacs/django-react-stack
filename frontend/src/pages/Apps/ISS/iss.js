import React from 'react';
import RainbowTitle from '../../../components/rainbow-hr/rainbow-hr';
import ISSElement from '../../../components/iss/iss';
import { Container } from 'react-bootstrap';

export default function ISS() {
    return (
        <>
            <Container className="section">
                <Container className="content w-75 py-5 m-auto">
                    <RainbowTitle title="Where's the ISS?" thickness='3px' width='100px' />
                    <p className='fs-5'>
                        Find out where the ISS is along with other information about it with
                        this web app built out of the API from&nbsp;
                        <a href='https://wheretheiss.at/' target='_blank'>Where the ISS at?</a>.
                    </p>
                </Container>
            </Container>
            <Container className="section">
                <Container className="content w-75 py-5 m-auto">
                    <ISSElement />
                </Container>
            </Container>
        </>
    );
}