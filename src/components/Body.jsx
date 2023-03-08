import { useAppContext } from '../Context/AppContext';
import { EquiRectangularImage } from '.';
// import { Panorama } from 'react-panellum';

export default function Body() {
    const { imageUrl } = useAppContext();
    return (
        <main className="w-full bg-black md:pl-[13.05rem]">
            <div className="absolute bg-gray-500 bg-opacity-50 backdrop-blur-sm w-full h-full animate-pulse"></div>
            <iframe className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative" allowFullScreen={true} allow="accelerometer; magnetometer; gyroscope" src={imageUrl} ></iframe>
            {/* <EquiRectangularImage /> */}
            {/* <Panorama 
             image={imageUrl}
             width="100%"
             height="100vh"
             pitch={10}
             yaw={180}
             autoLoad
             showControls
             hfov={110}
            /> */}
            {/* src="https://panoraven.com/en/embed/PYKxs5WSfX" */}
        </main>
    )
}