import NavBrand from "/assets/images/transparent.png";
import discord from "/assets/images/discord.png";
import { Disclosure, Transition, Tab } from "@headlessui/react";
import { ChevronDown } from "heroicons-react";
import { NavItem, NavCategory, EnvironmentConfig } from ".";
import { generateImage } from "../utils";
import { nav } from "../constants";
import { useAppContext } from "../Context/AppContext";
import axios from 'axios';

export default function Navbar() {
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
      let text = `A beautiful, equirectangular, ultra-realistic, highly detailed, photorealistic ${selectedCat === 'Living Room' ? 'futuristic living room' : ''} ${selectedCat === 'Mountain' ? 'landscape, photo of majestic mountains' : ''} with ${sceneItems.join(
        ", "
      )} ${selectedCat === 'Mountain' ? 'beatiful scenery,' : ''}  8k, cinematic, trending on artstation, award winning masterpiece, ${selectedCat === 'Mountain'?  'national geographic, vibrant colors, epic' : ''}.`;
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
    <nav className="text-white bg-black w-full p-3 md:hidden overflow-y-auto">
      <div className="overflow-y-auto">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex justify-between bg-black rounded-md">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <div>
                    <img className="w-12 h-12" src={NavBrand} alt="" />
                  </div>
                  <div>Dall-E - 360</div>
                </div>
                <Disclosure.Button>
                  <div
                    className={`${open ? "rotate-180" : "rotate-0"}
                                            transition-all duration-500 rounded-full border-2 p-0.5 flex items-center justify-center border-t-red-400`}
                  >
                    <ChevronDown />
                  </div>
                </Disclosure.Button>
              </div>
              <Transition
                show={open}
                enter="transition duration-300 ease-out"
                enterFrom="transform translate-y-full opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform translate-y-full opacity-100"
                leaveTo="transform scale-50 opacity-0"
              >
                <Disclosure.Panel className="mt-2 p-2 font-medium space-y-2">
                  <Tab.Group className="flex items-center mb-20 overflow-y-auto">
                    <Tab.List className="flex flex-col gap-3 w-full">
                      {nav.map((item) => {
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
                      <>
                <button
                  disabled
                  className="w-full bg-rose-500 rounded-lg py-1.5 font-medium hover:bg-rose-600 focus:bg-rose-600 transition-all opacity-70 duration-300"
                >
                  Generating...
                </button>
                <p className="opacity-80">It can take over a minute to generate your 360 environment</p>
                </>
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
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </nav>
  );
}
