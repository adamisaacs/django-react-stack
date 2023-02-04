import React from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import ISSComponent from '../../components/iss/iss';
import { Container } from 'react-bootstrap';


export default function ISS() {
    return (
        <>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <RainbowTitle title="Where's the ISS?" thickness='3px' width='100px' />
                    <p className='fs-5'>
                        Find out where the ISS is along with other information about it with this web app built
                        out of APIs from <a href='https://wheretheiss.at/' target='_blank' rel='noreferrer'>
                        Where the ISS at?</a> and Google. It refreshes every 3 seconds and uses
                        the data to display the location on the map. The circle represents the visibility range
                        for the astronauts onboard. It's visible on the ground from within the circle as well,
                        but only if it's dark on the ground and the ISS is still in the light.
                    </p>
                </Container>
            </Container>
            <Container fluid='true' className="section">
                <Container fluid='true' className="content w-75 py-5 m-auto">
                    <ISSComponent mapHeight='600px' />
                </Container>
            </Container>
        </>
    );
}