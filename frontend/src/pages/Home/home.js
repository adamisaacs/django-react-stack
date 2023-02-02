import { Component } from 'react';
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';
import {
    Link
} from 'react-router-dom';

import Slider from '../../components/slider/slider';


class Home extends Component {
    importAll(r) {
        return r.keys().map(r);
    }

    render() {
        const sliderImages = this.importAll(
            require.context('./slider-images', false, /\.(jpg|png)$/)
        );
        return (
            <>
            <Slider images={sliderImages} maxHeight='650px' />
            <div className="section-1">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Portfolio' thickness='3px' width='100px' />
                    <p className='fs-5'>
                        Welcome to my portfolio for my web apps. The logo and color scheme were chosen by&nbsp;
                        <Link to='https://labs.openai.com/'>DALL·E 2</Link>.
                        I generated the logo with my initials as the prompt and it happened to put 5 colored pixels
                        in the bottom corner, so I decided to use them as the color scheme.
                    </p>
                </div>
            </div>
            <div className="section-2">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className="section-3">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className="section-4">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className="section-5">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            </>
        );
    }
  }

  export default Home;