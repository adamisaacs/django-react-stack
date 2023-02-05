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
            { type === 'h1' ? <h1 className='text-break'>{title}</h1> :
                type === 'h2' ? <h2 className='text-break'>{title}</h2> :
                type === 'h3' ? <h3 className='text-break'>{title}</h3> :
                type === 'h4' ? <h4 className='text-break'>{title}</h4> :
                type === 'h5' ? <h5 className='text-break'>{title}</h5> :
                type === 'h6' ? <h6 className='text-break'>{title}</h6> :
                null
            }
            <Container
                className='rainbowhr d-flex ms-1 me-0 mt-2 mb-3 px-0 shadow-sm'
                style={{ width: width, height: thickness }}
            >
                <Container className='px-0'></Container>
                <Container className='px-0'></Container>
                <Container className='px-0'></Container>
                <Container className='px-0'></Container>
                <Container className='px-0'></Container>
            </Container>
            </>
        );
    }
}

export default RainbowTitle;