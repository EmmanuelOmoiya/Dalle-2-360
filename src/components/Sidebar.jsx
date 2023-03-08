import NavBrand from "/assets/images/transparent.png";
import discord from "/assets/images/discord.png";
import { Tab } from "@headlessui/react";
import { NavItem, NavCategory, EnvironmentConfig, Navbar } from ".";
import { nav } from "../constants";
import { generateImage } from "../utils";
import { useAppContext } from "../Context/AppContext";
import Toaster, { toast } from "react-hot-toast";
import React from "react";
import axios from "axios";

const Sidebar = () => {
  const {
    selectedCat,
    loading,
    setLoading,
    sceneItems,
    selectedLink,
    setSelectedLink,
    setSelectedCat,
    setSceneItems,
    imageUrl,
    setImageUrl
  } = useAppContext();
  const handleSubmit = async() => {
    if (sceneItems.length !== 0) {
      let text = `An Equirectangular view of a ${selectedCat} with ${sceneItems.join(
        ", "
      )}.`;
      try {
        setLoading(true);
        console.log(text);
        await axios({
          method: "POST",
          url: `https://dalle360-2-6k6gsdlfoa-el.a.run.app/generate-image`,
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
          data: { text: text },
        })
          .then((response) => {
            setImageUrl(response.data.url);
          });
      } catch (err) {
        setLoading(false);
        console.log(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("You need to choose your preffered enviroment or scene");
    }
  }

  return (
    // Making 2 navbar
    <header className="fixed w-full z-50">
      <nav className="hidden md:flex bg-black text-white fixed h-screen px-7 py-4">
        <div className="flex flex-col h-full gap-36 overflow-auto">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <div className="">
              <img className="w-10 h-10" src={NavBrand} alt="" />
            </div>
            <div className="font-bold text-xl mr-2">DALL-E - 360</div>
          </div>
          <Tab.Group className="flex items-center mb-20">
            <Tab.List className="flex flex-col gap-3 w-full">
              {nav.map((item, index) => {
                return item.name !== "dropdown" ? (
                  <>
                    <NavItem
                      name={item.name}
                      selectedLink={selectedLink}
                      setSelectedLink={setSelectedLink}
                    />
                  </>
                ) : (
                  <>
                    <EnvironmentConfig
                      selectedLink={selectedLink}
                      setSelectedLink={setSelectedLink}
                      selectedCat={selectedCat}
                      setSelectedCat={setSelectedCat}
                      dropdowns={item.dropdowns}
                    />

                    <Tab
                      className="w-full flex items-center gap-2 focus:outline-none"
                      onClick={() => setSelectedLink("dropdown")}
                    >
                      <>
                        <div
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            selectedLink === "dropdown"
                              ? "bg-rose-500 h-full"
                              : "bg-white"
                          }`}
                        ></div>
                        <NavCategory
                          dropdowns={item.dropdowns}
                          selectedCat={selectedCat}
                          setSelectedCat={setSelectedCat}
                          styling={`${
                            selectedLink === "dropdown"
                              ? "border-rose-400"
                              : "border-white"
                          }`}
                          sceneItems={sceneItems}
                          setSceneItems={setSceneItems}
                          selectedLink={selectedLink}
                          setSelectedLink={setSelectedLink}
                        />
                      </>
                    </Tab>
                  </>
                );
              })}
              {loading ? (
                <button
                  disabled
                  className="w-full bg-rose-500 rounded-lg py-1.5 font-medium hover:bg-rose-600 focus:bg-rose-600 transition-all opacity-70 duration-300"
                >
                  Generating...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-rose-500 rounded-lg py-1.5 font-medium hover:bg-rose-600 focus:bg-rose-600 transition-all duration-300"
                >
                  Generate
                </button>
              )}
            </Tab.List>
          </Tab.Group>
          <a
            href="#"
            className="flex items-center gap-1 px-3 p-3 mb-3 text-gray-200 fixed bottom-0"
          >
            <img className="w-7" src={discord} alt="" />
            <div className="bg-gray-300 mx-2 w-1 h-1 rounded-full"></div>
            <div>Discord</div>
          </a>
        </div>
      </nav>
      <Toaster />
      <Navbar />
    </header>
  );
};
export default Sidebar;
