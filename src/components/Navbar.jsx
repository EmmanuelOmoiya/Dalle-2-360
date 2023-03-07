import NavBrand from "/assets/images/transparent.png";
import discord from "/assets/images/discord.png";
import { Disclosure, Transition, Tab } from "@headlessui/react";
import { ChevronDown } from "heroicons-react";
import { NavItem, NavCategory, EnvironmentConfig } from ".";
import { generateImage } from '../utils';
import { nav } from '../constants';
import { useAppContext } from '../Context/AppContext';

export default function Navbar() {
    const { selectedCat, sceneItems, selectedLink, setSelectedLink, setSelectedCat, setSceneItems } = useAppContext();

    function handleSubmit() {
        if(selectedCat && sceneItems){
          let text = `An Equirectangular view of a ${selectedCat} with ${sceneItems.join(
            ", "
          )}.`;
          generateImage(text);
        } else {
          alert('You need to choose and add the required choices and scenes')
        }
      }

  return (
    <nav className="text-white bg-black w-full p-3 md:hidden">
      <div>
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
				  <EnvironmentConfig selectedLink={selectedLink} setSelectedLink={setSelectedLink} selectedCat={selectedCat} setSelectedCat={setSelectedCat} dropdowns={item.dropdowns}/>

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
                      <button
                        onClick={handleSubmit}
                        className="w-full mt-4 bg-rose-500 rounded-lg py-1.5 font-medium hover:bg-rose-600 focus:bg-rose-600 transition-all duration-300"
                      >
                        Generate
                      </button>
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
