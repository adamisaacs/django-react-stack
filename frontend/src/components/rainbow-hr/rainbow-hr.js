import { Component } from 'react';
import {
    Container,
} from 'react-bootstrap';
import './rainbow-hr.css';

class RainbowTitle extends Component {
    static defaultProps = {
        title: 'Title',
        type: 'h1',
        thickness: '2px',
        width: '100px',
    };

    render() {
        const { title, type, thickness, width } = this.props;
        return (
            <>
            { type === 'h1' ? <h1>{title}</h1> :
                type === 'h2' ? <h2>{title}</h2> :
                type === 'h3' ? <h3>{title}</h3> :
                type === 'h4' ? <h4>{title}</h4> :
                type === 'h5' ? <h5>{title}</h5> :
                type === 'h6' ? <h6>{title}</h6> :
                null
            }
            <Container
                className='rainbowhr d-flex ms-1 me-0 mt-2 mb-3 px-0'
                style={{ width: width, height: thickness }}
            >
                <Container fluid className='px-0'></Container>
                <Container fluid className='px-0'></Container>
                <Container fluid className='px-0'></Container>
                <Container fluid className='px-0'></Container>
                <Container fluid className='px-0'></Container>
            </Container>
            </>
        );
    }
}

export default RainbowTitle;