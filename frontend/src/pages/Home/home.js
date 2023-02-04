import { Component } from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import {
    Link
} from 'react-router-dom';

import Slider from '../../components/slider/slider';
import ProgressiveImage from '../../components/progressive-image/progressive-image';
import placeholderExample from './curiosity-small.jpg';
import fullExample from './curiosity-large.jpg';
import arrow from './arrow-right.png';
import { Button, Container, Image } from 'react-bootstrap';
import GitHubLogo from './github-logo.png';


class Home extends Component {
    importAll(r) {
        return r.keys().map(r);
    }

    render() {
        const sliderImages = this.importAll(
            require.context('./slider-images', false, /\.(jpg|png)$/)
        );
        const sliderProgressives = this.importAll(
            require.context('./slider-images/progressives', false, /\.(jpg|png)$/)
        );

        return (
            <>
                <Slider
                    images={sliderImages}
                    progressives={sliderProgressives}
                    maxHeight='600px'
                />
                <Container fluid='true'>
                    <Container fluid='true' className="section">
                        <Container fluid='true' className="content w-75 py-5 m-auto">
                            <RainbowTitle title='Portfolio' thickness='3px' width='100px' />
                            <p className='fs-5'>
                                Welcome to my portfolio for my web apps. The logo and color scheme were chosen by&nbsp;
                                <Link to='https://labs.openai.com/'>DALL·E 2</Link>.
                                I generated the logo with my initials as the prompt and it happened to put 5 colored pixels
                                in the bottom corner, so I decided to use them as the color scheme.
                            </p>
                        </Container>
                    </Container>
                    <Container fluid='true' className="section">
                        <Container fluid='true' className="content w-75 py-5 m-auto">
                            <RainbowTitle title='Progressively loading images' type='h2' width='80px' />
                            <p className='fs-5'>
                                The image on the left is 1/100<sup>th</sup> the size of the one on the right, which is almost
                                8k for the sake of the demonstration. Reload your browser and check out the progressive image
                                loading.<br />
                                <span className='fs-6 text-muted'>(<code>Ctrl + Shift + R</code> to clear your cache and&nbsp;
                                    <em>really</em> see it in action)</span>
                            </p>
                            <Container fluid='true' className='d-flex justify-content-center align-items-center'>
                                <Container fluid='true' className='me-3 me-lg-5 flex-grow-1 w-50'>
                                    <Image
                                        src={placeholderExample}
                                        width='100%'
                                        alt='Curiosity on Mars in low quality'
                                        className='shadow-lg'
                                    />
                                </Container>
                                <Container fluid='true' className='flex-grow-1 w-50'>
                                    <ProgressiveImage
                                        placeholderImage={placeholderExample}
                                        src={fullExample}
                                        alt='Curiosity on Mars'
                                        width='100%'
                                        className='shadow-lg'
                                    />
                                </Container>
                            </Container>
                            <Container fluid='true'
                                className='mx-auto'
                                style={{
                                    width: '35%',
                                    marginTop: '-8%',
                                    zIndex: '1',
                                }}
                            >
                                <Image
                                    src={arrow}
                                    width='100%'
                                />
                            </Container>
                        </Container>
                    </Container>
                    <Container fluid='true' className="section">
                        <Container fluid='true' className="content w-75 py-5 m-auto">
                            <RainbowTitle title='Available on GitHub' type='h2' width='80px' />
                            <p className='fs-5 m-0'>
                                The entire site is in a public repository on&nbsp;
                                <Link to='https://github.com/adamisaacs/django-react-stack' className='text-decoration-none' target='_blank' rel='noreferrer'>
                                    <Button className="button-hover fs-5 border-2 border-dark bg-light p-2 text-dark lh-1 d-inline-flex align-items-center">
                                        <Image src={GitHubLogo} width='30' className='me-2' /> GitHub
                                    </Button>
                                </Link>
                            </p>
                        </Container>
                    </Container>
                    <Container fluid='true' className="section">
                        <Container fluid='true' className="content w-75 py-5 m-auto">
                            <RainbowTitle title='Example' type='h2' width='80px' />
                            <p className='fs-5'>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </Container>
                    </Container>
                    <Container fluid='true' className="section">
                        <Container fluid='true' className="content w-75 py-5 m-auto">
                            <RainbowTitle title='Example' type='h2' width='80px' />
                            <p className='fs-5'>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </Container>
                    </Container>
                </Container>
            </>
        );
    }
}

export default Home;