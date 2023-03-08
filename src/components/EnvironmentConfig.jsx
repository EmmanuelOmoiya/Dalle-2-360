import { Disclosure, Tab, Transition } from "@headlessui/react";
import { CheckCircle, ChevronDown } from "heroicons-react";

export default function EnvironmentConfig({
  selectedLink,
  setSelectedLink,
  selectedCat,
  setSelectedCat,
  dropdowns,
}) {
  return (
    <div className="w-full flex items-center">
      <div
        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 mr-3 ${
          selectedLink === "sceneChoice" ? "bg-rose-500 h-full" : "bg-white"
        }`}
      ></div>
      <Disclosure
        className="w-full"
        onClick={() => setSelectedLink("sceneChoice")}
      >
        {({ open }) => (
          <div className={`border w-full rounded-lg p-2 `}>
            <Disclosure.Button as={`div`} className="w-full focus:outline-none">
              <div className="flex items-center justify-between w-full cursor-pointer">
                {selectedCat}
                <ChevronDown
                  className={`${
                    open ? "rotate-180" : "rotate-0"
                  } transition-all duration-300`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-300 ease-out"
              enterFrom="transform translate-y-full opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform translate-y-full opacity-100"
              leaveTo="transform scale-50 opacity-0"
            >
              <Disclosure.Panel className="py-2">
                <Tab.Group vertical>
                  <Tab.List className={`flex flex-col gap-2`}>
                    {dropdowns.map((item, index) => (
                      <Tab
                        key={index}
                        onClick={() => setSelectedCat(item.name)}
                        className="text-left p-2 rounded-md font-medium flex items-center justify-between hover:translate-x-2 duration-300 w-full"
                      >
                        <div className="flex gap-1 flex-row items-center w-full">
                          <div
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              selectedCat === item.name
                                ? "bg-rose-500 h-4"
                                : "bg-white"
                            }`}
                          ></div>
                          <div className="flex items-center justify-between w-full">
                            {item.name}
                            {selectedCat === item.name && <CheckCircle />}
                          </div>
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
