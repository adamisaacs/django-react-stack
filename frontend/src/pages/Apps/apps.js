import React from "react";
import RainbowTitle from '../../components/rainbow-hr/rainbow-hr';

export default function Apps() {
    return (
        <div className="section">
            <div className="content w-75 py-5 m-auto">
                <RainbowTitle title='Applications' thickness='3px' width='100px' />
                <p className='fs-5'>
                    All of my apps will be listed here.
                </p>
            </div>
        </div>
    );
  }