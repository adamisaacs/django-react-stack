import React from 'react';
import { Container } from 'react-bootstrap';

class ISS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: [],
        }
    }

    runAPI() {
        fetch("https://api.wheretheiss.at/v1/satellites/25544?units=miles")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        info: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                },
            )
    }

    componentDidMount() {
        this.runAPI();

        this.timerID = setInterval(
            () => this.updateInfo(),
            1000//860
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateInfo() {
        this.runAPI();
    }

    render() {
        const { error, isLoaded, info } = this.state;

        if (error) {
            return 'uh oh';
        } else if (!isLoaded) {
            return (
                <>
                    <Container fluid='true'>
                        Name: Loading...
                    </Container>
                    <Container fluid='true'>
                        Latitude: Loading...
                    </Container>
                    <Container fluid='true'>
                        Longitude: Loading...
                    </Container>
                    <Container fluid='true'>
                        Altitude: Loading...
                    </Container>
                    <Container fluid='true'>
                        Velocity: Loading...
                    </Container>
                    <Container fluid='true'>
                        Sun exposure: Loading...
                    </Container>
                </>
            );
        } else {
            const name = (info.name).toUpperCase()
            const latitude = parseFloat(info.latitude).toFixed(4);
            const longitude = parseFloat(info.longitude).toFixed(4);
            const altitude = parseFloat(info.altitude).toFixed(2);
            const velocity = parseFloat(info.velocity).toFixed(2);
            const visibility = info.visibility.charAt(0).toUpperCase() + info.visibility.slice(1);

            return (
                <>
                    <Container fluid='true'>
                        Name: {name}
                    </Container>
                    <Container fluid='true'>
                        Latitude: {latitude} degrees <small>(negative means southern hemisphere)</small>
                    </Container>
                    <Container fluid='true'>
                        Longitude: {longitude} degrees <small>(negative means western hemisphere)</small>
                    </Container>
                    <Container fluid='true'>
                        Altitude: {altitude} miles high
                    </Container>
                    <Container fluid='true'>
                        Velocity: {velocity} mph
                    </Container>
                    <Container fluid='true'>
                        Sun exposure: {visibility}
                    </Container>
                </>
            );
        }
    }
}

export default ISS;