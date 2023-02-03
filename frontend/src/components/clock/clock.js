import React from "react";
import { Container } from 'react-bootstrap';


function SecondHand(props) {
    return (
        <Container fluid='true'
            className="seconds d-flex w-100 justify-content-center align-items-end"
            style={{
                transform: props.angle,
                height: '100%',
                position: 'absolute',
                paddingBottom: '50%'
            }}
        >
            <Container
                className='bg-danger m-0 p-0 rounded-pill'
                style={{
                    width: props.width,
                    height: '95%',
                    position: 'relative',
                    bottom: props.offset,
                }}
            ></Container>
        </Container>
    );
}

function MinuteHand(props) {
    return (
        <Container fluid='true'
            className="minutes d-flex w-100 justify-content-center align-items-end"
            style={{
                transform: props.angle,
                height: '100%',
                position: 'absolute',
                paddingBottom: '50%'
            }}
        >
            <Container
                className='bg-dark m-0 p-0 rounded-pill'
                style={{
                    width: props.width,
                    height: '80%',
                    position: 'relative',
                    bottom: props.offset,
                }}
            ></Container>
        </Container>
    );
}

function HourHand(props) {
    return (
        <Container fluid='true'
            className="hours d-flex w-100 justify-content-center align-items-end"
            style={{
                transform: props.angle,
                height: '100%',
                position: 'absolute',
                paddingBottom: '50%'
            }}
        >
            <Container
                className='bg-black m-0 p-0 rounded-pill'
                style={{
                    width: props.width,
                    height: '60%',
                    position: 'relative',
                    bottom: props.offset,
                }}
            ></Container>
        </Container>
    );
}

function Dot() {
    return (
        <Container fluid='true'
            className="clock-dot d-flex w-100 justify-content-center align-items-end"
            style={{
                height: '100%',
                position: 'absolute',
                paddingBottom: '50%',
            }}
        >
            <Container
                className='bg-black me-0 mt-0 p-0 rounded-circle'
                style={{
                    width: '2px',
                    height: '2px',
                    marginLeft: '1px',
                    marginBottom: '-1px',
                }}
            ></Container>
        </Container>
    );
}

function Tick(props) {
    return (
        <Container fluid='true'
            className="d-flex w-100 justify-content-end align-items-end"
            style={{
                transform: props.angle,
                height: '100%',
                position: 'absolute',
                paddingBottom: '50%'
            }}
        >
            <Container
                className='bg-black m-0 p-0 rounded-pill'
                style={{
                    width: props.width,
                    height: '2px',
                }}
            ></Container>
        </Container>
    );
}

function Ticks(props) {
    return (
        <Container fluid='true' className="ticks w-100" style={{ height: '100%'}}>
            {Array(12).fill(null).map((i, index) => {
                const angle = 'rotate(' + (index * 30) + 'deg)';
                return <Tick key={index} angle={angle} width={props.width} />;
            })}
        </Container>
    );
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    static defaultProps = {
        width: '300px',
        height: '300px',
        secondWidth: '5px',
        minuteWidth: '10px',
        hourWidth: '15px',
        bgColor: 'rgb(248, 249, 250)',
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.timeTick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    timeTick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const date = this.state.date;
        const time = DateToTimes(date);
        const angles = TimesToAngles(time);
        const anglesCSS = AnglesToCSS(angles);

        return (
            <Container fluid='true'
                className='clock d-flex mx-auto align-items-center border-dark rounded-circle'
                style={{
                    width: this.props.width,
                    maxWidth: '100%',
                    height: this.props.height,
                    maxHeight: 'calc(75vw)',
                    position: 'relative',
                    borderStyle: 'solid',
                    borderWidth: this.props.minuteWidth,
                    backgroundColor: this.props.bgColor,
                }}
            >
                <HourHand angle={anglesCSS[0]} width={this.props.hourWidth} offset={'-' + this.props.minuteWidth} />
                <MinuteHand angle={anglesCSS[1]} width={this.props.minuteWidth} offset={'-' + this.props.minuteWidth} />
                <SecondHand angle={anglesCSS[2]} width={this.props.secondWidth} offset={'-' + this.props.minuteWidth} />
                <Dot />
                <Ticks width={this.props.minuteWidth} />
            </Container>
        );
    }
}

function DateToTimes(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [hours, minutes, seconds];
}

function TimesToAngles(time) {
    const hoursPercent = (time[0] % 12) / 12;
    const hoursAngle = hoursPercent * 360;
    const minutesPercent = time[1] / 60;
    const minutesAngle = minutesPercent * 360;
    const secondsPercent = time[2] / 60;
    const secondsAngle = secondsPercent * 360;

    return [hoursAngle, minutesAngle, secondsAngle];
}

function AnglesToCSS(angles) {
    const hoursCSS = 'rotate(' + angles[0] + 'deg)';
    const minutesCSS = 'rotate(' + angles[1] + 'deg)';
    const secondsCSS = 'rotate(' + angles[2] + 'deg)';

    return [hoursCSS, minutesCSS, secondsCSS];
}

export default Clock;