import React from "react";
const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [selectedLink, setSelectedLink] = React.useState("Home");
    const [selectedCat, setSelectedCat] = React.useState("Living Room");
    const [sceneItems, setSceneItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('https://i.ibb.co/b6cKTCT/image.png');
    const [loading, setLoading] = React.useState(false);
    return <Context.Provider value={{
        loading,
        setLoading,
        selectedLink,
        setSelectedLink,
        selectedCat,
        setSelectedCat,
        sceneItems,
        setSceneItems,
        selectedItem, 
        setSelectedItem,
        imageUrl,
        setImageUrl,
    }}>
        {children}
    </Context.Provider>
}

const useAppContext = () => React.useContext(Context);
  
export { ContextProvider, useAppContext }