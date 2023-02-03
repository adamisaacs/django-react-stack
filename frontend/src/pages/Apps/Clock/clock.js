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
                    This is the first React component I wrote on my own. It's a simple clock
                    that runs off the client's time and updates through CSS. The next goal
                    for the clock is to add a time zone selector, with the end goal being to
                    update the clock to the users' time zone automatically when users are added.
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
                    bgColor='white'
                />
            </div>
        </div>
        </>
    );
}