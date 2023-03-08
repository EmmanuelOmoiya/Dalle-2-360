import React from "react";
import { useAppContext } from "../Context/AppContext";
import ReactPannellum from "react-pannellum";

const EquirectangularImage = () => {
  const { imageUrl } = useAppContext();
  const config = {
    autoRotate: -2,
    showZoomCtrl: false,
    showFullscreenCtrl: false,
    autoLoad: true
  };
  const viewerRef = React.useRef();
  return(
    <div className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative">
      <ReactPannellum
      className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative"
          id="1"
          sceneId="firstScene"
          imageSource={imageUrl}
          config={config}
          style={{
              width: "100%",
              height: "100vh",
            }}
        />
    </div>
  )
}

export default EquirectangularImage;
