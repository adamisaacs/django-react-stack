import React, { Component } from 'react';
import {
    Carousel
} from 'react-bootstrap';
import ProgressiveImage from '../progressive-image/progressive-image';
import './slider.css';

class Slider extends Component {
    static defaultProps = {
        images: [],
        variant: 'light',
        maxHeight: '650px',
    };

    render() {
        const maxHeight = this.props.maxHeight;
        const slides = this.props.images.map((image, index) =>
            <Carousel.Item>
                <ProgressiveImage
                    className='w-100'
                    placeholderImage={this.props.progressives[index]}
                    src={image}
                    alt={'Slide ' + image.id}
                    width='100%'
                />
            </Carousel.Item>
        );

        return (
            <>
            <Carousel variant={this.props.variant} className='overflow-hidden' style={{ maxHeight: maxHeight }}>
                {slides}
            </Carousel>
            </>
        );
    }
}

export default Slider;