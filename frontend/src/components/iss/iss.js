import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Wrapper } from '@googlemaps/react-wrapper';
import ISSImage from './iss-icon-black.png';
import Sun from './sun.png';
import Badge from 'react-bootstrap/Badge';

function Map(props) {
    const center = new window.google.maps.LatLng(props.center[0], props.center[1]);
    const ref = useRef();
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new window.google.maps.Map(ref.current, {
                center: center,
                zoom: 3,
                mapTypeId: 'satellite',
            });
            markerRef.current = new window.google.maps.Marker({
                position: center,
                map: mapRef.current,
                icon: {
                    url: ISSImage,
                    anchor: new window.google.maps.Point(70, 39),
                }
            });
            circleRef.current = new window.google.maps.Circle({
                strokeColor: "rgb(60, 70, 255)",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "rgb(60, 70, 255)",
                fillOpacity: 0.35,
                map: mapRef.current,
                center: center,
                radius: 2196314.04,
            });

            const time = new Date();
            const curHour = time.getHours();
            const curMinute = time.getMinutes();
            const curSecond = time.getSeconds();
            const offsetX = ((curHour * 3600 + curMinute * 60 + curSecond) / 86400) * 360 - 205;

            const dayOfYear = (time.getMonth() * 30.4 + time.getDate()) / 365;
            const offsetY = -Math.sin(2 * Math.PI * (dayOfYear - 81) / 365) * 47 - 23.5;

            new window.google.maps.Circle({
                map: mapRef.current,
                center: new window.google.maps.LatLng(offsetY, offsetX),
                radius: 10000000,
                fillColor: "#000",
                fillOpacity: 0.3,
                strokeOpacity: 0,
                clickable: false,
                editable: false
            });
            new window.google.maps.Marker({
                position: new window.google.maps.LatLng(-1 * offsetY, offsetX + 180),
                map: mapRef.current,
                icon: {
                    url: Sun,
                    anchor: new window.google.maps.Point(20, 20),
                }
            });





        } else {
            mapRef.current.panTo(center);
            markerRef.current.setPosition(center);
            circleRef.current.setCenter(center);
        }
    });

    return (
        <Container fluid='true'
            ref={ref}
            id="map"
            className='stretch'
            style={{ height: props.height }}
        />
    );
}

class ISS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: [],
        }
    }

    static defaultProps = {
        height: '100px',
    };

    runAPI() {
        fetch("https://api.wheretheiss.at/v1/satellites/25544?units=miles")
            .then(res => {
                if (res.status === 429) {
                    throw new Error("Too many requests");
                }
                return res.json();
            })
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
                        error: error.toString()
                    });
                },
            )
    }

    componentDidMount() {
        this.runAPI();

        this.timerID = setInterval(
            () => this.updateInfo(),
            3000//860
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateInfo() {
        this.runAPI();
    }

    RenderISS(props) {
        return (
            <>
                <Container fluid='true' className='d-flex flex-wrap justify-content-center mb-3'>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Name:</small><br />
                        <span className='fw-normal fs-6'>{props.name}</span>
                    </Badge>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Latitude:</small><br />
                        <span className='fw-normal fs-6'>{props.latitude}</span>
                    </Badge>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Longitude:</small><br />
                        <span className='fw-normal fs-6'>{props.longitude}</span>
                    </Badge>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Altitude:</small><br />
                        <span className='fw-normal fs-6'>{props.altitude}</span>
                    </Badge>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Velocity:</small><br />
                        <span className='fw-normal fs-6'>{props.velocity}</span>
                    </Badge>
                    <Badge bg='none' className='shadow-dark mb-3 me-3 bg-light text-dark px-3 py-2'>
                        <small className='fw-light'>Sun exposure:</small><br />
                        <span className='fw-normal fs-6'>{props.exposure}</span>
                    </Badge>
                </Container>
            </>
        );
    }

    render() {
        const { error, isLoaded, info } = this.state;
        const mapHeight = this.props.mapHeight;

        if (error) {
            const loading = 'Loading...';
            return (
                <Container fluid='true' style={{ height: mapHeight }}>
                    {error}
                    <this.RenderISS
                        name={loading}
                        latitude={loading}
                        longitude={loading}
                        altitude={loading}
                        velocity={loading}
                        exposure={loading}
                    />
                </Container>
            );
        } else if (!isLoaded) {
            const loading = 'Loading...';
            return (
                <>
                    <this.RenderISS
                        name={loading}
                        latitude={loading}
                        longitude={loading}
                        altitude={loading}
                        velocity={loading}
                        exposure={loading}
                    />
                    <Container fluid='true' style={{ height: mapHeight }} />
                </>
            );
        } else {
            const name = (info.name).toUpperCase()
            const latitude = parseFloat(info.latitude).toFixed(4);
            const longitude = parseFloat(info.longitude).toFixed(4);
            const altitude = parseFloat(info.altitude).toFixed(2);
            const velocity = parseFloat(info.velocity).toFixed(2);
            const visibility = info.visibility.charAt(0).toUpperCase() + info.visibility.slice(1);

            const APIKey = 'AIzaSyCv7wdh7CpBPDKHaRcVjG5G7D6Jrq1qx2o';
            const render = function (status) {
                if (status === "FAILURE") return status;
                return (
                    <Container fluid='true' style={{ height: mapHeight }}>
                        {status}
                    </Container>
                );
            };

            return (
                <>
                    <this.RenderISS
                        name={name}
                        latitude={latitude + ' degrees'}
                        longitude={longitude + ' degrees'}
                        altitude={altitude + ' miles high'}
                        velocity={velocity + ' mph'}
                        exposure={visibility}
                    />
                    <Wrapper apiKey={APIKey} render={render}>
                        <Map center={[info.latitude, info.longitude]} height={mapHeight} />
                    </Wrapper>
                </>
            );
        }
    }
}

export default ISS;