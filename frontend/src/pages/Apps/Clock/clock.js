import React from "react";
import ClockElement from '../../../components/clock/clock';
import RainbowTitle from '../../../components/rainbow-hr/rainbow-hr';


export default function Clock() {
    return (
        <>
        <div className="section-1">
            <div className="content w-75 py-5 m-auto">
            <RainbowTitle title='Circular Clock' thickness='3px' width='100px' />
                <p className='fs-5'>
                    This is the first React app I wrote without a tutorial. It is a simple
                    clock that runs off the client time and updates with CSS.
                </p>
            </div>
        </div>
        <div className="section-2">
            <div className="content w-75 py-5 m-auto">
                <ClockElement
                    width='400px'
                    height='400px'
                    secondWidth='8px'
                    minuteWidth='16px'
                    hourWidth='24px'
                    bgColor='rgb(230, 240, 250)'
                />
            </div>
        </div>
        </>
    );
}