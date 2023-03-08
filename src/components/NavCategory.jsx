import React from "react";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { CheckCircle, ChevronDown } from "heroicons-react";
import { useAppContext } from "../Context/AppContext";

const NavCategory = ({ dropdowns, styling }) => {
  const {
    selectedCat,
    sceneItems,
    setSceneItems,
    selectedItem,
    setSelectedItem,
  } = useAppContext();
  const toggleSceneItems = (name) => {
    const index = sceneItems.indexOf(name);
    if (index === -1) {
      setSceneItems([...sceneItems, name]);
    } else {
      const newArr = [...sceneItems];
      newArr.splice(index, 1);
      setSceneItems(newArr);
    }
  };
  React.useEffect(() => {
    setSceneItems([]);
  }, [selectedCat]);
  return (
    <div className="w-full">
      <Disclosure as={`div`} className="w-full">
        {({ open }) => (
          <div className={`border w-full rounded-lg p-2 ${styling} `}>
            <Disclosure.Button
              as="div"
              className="flex items-center justify-between flex-wrap w-full"
            >
              {selectedCat === "Living Room" && <p> Environment </p>}
              {selectedCat === "Mountain" && <p> Scenery </p>}
              <ChevronDown
                className={`${
                  open ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
              />
            </Disclosure.Button>
            {dropdowns
              .filter((item) => item.name === selectedCat)
              .map((item) => {
                return item.properties.map((itemName, index) => {
                  return (
                    <Transition
                      show={open}
                      enter="transition duration-300 ease-out"
                      enterFrom="transform translate-y-full opacity-0"
                      enterTo="transform translate-y-0 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform translate-y-full opacity-100"
                      leaveTo="transform scale-50 opacity-0"
                      key={index}
                    >
                      <Disclosure.Panel className={`py-2`}>
                        <Tab.Group vertical>
                          <Tab.List className={`flex flex-col gap-2 w-full`}>
                            <Tab
                              onClick={() => toggleSceneItems(itemName.name)}
                              className="text-left p-2 rounded-md font-medium flex items-center justify-between hover:translate-x-2 duration-300 w-full"
                            >
                              <div className="flex gap-1 flex-row items-center w-full">
                                <div
                                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                    selectedItem
                                      ? "bg-rose-500 h-4"
                                      : "bg-white"
                                  }`}
                                ></div>
                                <div className="flex items-center justify-between w-full">
                                  {itemName.name}
                                  {sceneItems.includes(itemName.name) && (
                                    <CheckCircle />
                                  )}
                                </div>
                              </div>
                            </Tab>
                          </Tab.List>
                        </Tab.Group>
                      </Disclosure.Panel>
                    </Transition>
                  );
                });
              })}
          </div>
        )}
      </Disclosure>
    </div>
  );
};
export default NavCategory;
