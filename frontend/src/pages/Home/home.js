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
            <div className="section bg-yellow text-dark">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Home' thickness='3px' width='80px' />
                    <p className='fs-5'>
                        Welcome to my portfolio for my web apps.
                    </p>
                </div>
            </div>
            <div className="section bg-teal text-dark">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Design' type='h2' width='80px' />
                    <p className='fs-5'>
                        The logo and color scheme were chosen by&nbsp;
                        <Link to='https://labs.openai.com/'>DALL·E 2</Link>.
                        I generated the logo with my initials as the prompt and it happened to
                        choose 5 colors and put them in the bottom corner, so I decided to use
                        them as the color scheme.
                    </p>
                </div>
            </div>
            <div className="section bg-green text-dark">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className="section bg-orange text-dark">
                <div className="content w-75 py-5 m-auto">
                    <RainbowTitle title='Example' type='h2' width='80px' />
                    <p className='fs-5'>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className="section bg-purple text-dark">
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