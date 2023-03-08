import React from "react";
import { useAppContext } from "../Context/AppContext";

const EquiRectangularImage = () => {
  const canvasRef = React.useRef(null);
    const { imageUrl } = useAppContext();
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageUrl;
    console.log(img.src);
    img.onload = () => {
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;
      
      const scale = Math.min(width / img.width, height/img.height)
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      console.log("starteds");
      ctx.drawImage(img, (width - newWidth)/2, (height-newHeight)/2, newWidth, newHeight)
      
      const radius = width / (2 * Math.PI);
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const theta = (x - halfWidth) / radius;
          const phi = (y - halfHeight) / radius;
          const sourceX = Math.floor(
            halfWidth + radius * Math.atan2(theta, Math.sqrt(1 - theta * theta))
          );
          const sourceY = Math.floor(
            halfHeight + radius * Math.atan2(phi, Math.sqrt(1 - phi * phi))
          );
          ctx.fillStyle = `rgb(${img.data[(sourceY * width + sourceX) * 4]},${
            img.data[(sourceY * width + sourceX) * 4 + 1]
          },${img.data[(sourceY * width + sourceX) * 4 + 2]})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    };
  }, [imageUrl]);
  return (
    <div className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative pl-8">
      <canvas ref={canvasRef} />
    </div>
  );
};

// const EquiRectangularImage = () => {
//   const canvasRef = React.useRef(null);
//   const { imageUrl } = useAppContext();
//   const [ctx, setCtx] = React.useState(null);
//   const [dragging, setDragging] = React.useState(false);
//   const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
//   const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
//   const [rotation, setRotation] = React.useState(0);

//   React.useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 1, 0);
//       setCtx(ctx);
//       console.log('loaded')
//     };

//     img.src = imageUrl;
//   }, [imageUrl]);

//   const handleMouseDown = (e) => {
//     setDragging(true);
//     setStartPos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e) => {
//     if (dragging) {
//       const diffX = e.clientX - mousePos.x;
//       const diffY = e.clientY - mousePos.y;
//       const newRotation = rotation + diffX * 0.1;
//       setRotation(newRotation);
//     }

//     setMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     setDragging(false);
//   };

//   return (
//     <canvas
//       className="h-[100vh] w-full mt-[4.5rem] md:m-0 relative pl-8"
//       ref={canvasRef}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       style={{ transform: `rotateY(${rotation}deg)`, cursor: 'grab' }}
//     />
//   );
// };
export default EquiRectangularImage;


