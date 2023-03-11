import { useAppContext } from '../Context/AppContext';
import React from 'react';
import EquirectangularImage from './EquirectangularImage';

export default function Body() {
    const { imageUrl } = useAppContext();
    return (
        <main className="w-full bg-black md:pl-[13.05rem]">
            <div className="absolute bg-gray-500 bg-opacity-50 backdrop-blur-sm w-full h-full animate-pulse"></div>
                <EquirectangularImage />
        </main>
    )
}
