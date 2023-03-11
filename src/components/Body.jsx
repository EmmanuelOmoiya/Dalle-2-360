import { useAppContext } from '../Context/AppContext';
import React from 'react';
import EquirectangularImage from './EquirectangularImage';

export default function Body() {
    const { imageUrl } = useAppContext();
    return (
        <main className="w-full bg-black md:pl-[13.05rem]">
            <div className="absolute bg-gray-500 bg-opacity-50 backdrop-blur-sm w-full h-full animate-pulse"></div>
            {
                imageUrl === "https://i.ibb.co/Ph2Mszw/image.png"
                ?
                <iframe className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative" allowFullScreen={true} allow="accelerometer; magnetometer; gyroscope" src="https://i.ibb.co/Ph2Mszw/image.png" ></iframe>
                :
                <EquirectangularImage />
            }
        </main>
    )
}
