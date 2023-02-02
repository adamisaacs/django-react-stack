import React, { Component } from 'react';
import {
    Carousel,
    Image
} from 'react-bootstrap';

class Slider extends Component {
    static defaultProps = {
        images: [],
        variant: 'light',
        maxHeight: '650px',
    };

    render() {
        const maxHeight = this.props.maxHeight;
        const slides = this.props.images.map((image) =>
            <Carousel.Item>
                <Image
                    className='w-100'
                    src={image}
                    alt={'Slide ' + image.id}
                />
            </Carousel.Item>
        );
        return (
            <Carousel variant={this.props.variant} className='overflow-hidden' style={{ maxHeight: maxHeight }}>
                {slides}
            </Carousel>
        );
    }
}

export default Slider;