import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { CheckCircle, ChevronDown } from "heroicons-react";
import { useAppContext } from '../Context/AppContext';

const NavItem = ({ name }) => {
	const { selectedLink, setSelectedLink } = useAppContext();
  return (
    <> 
      <Tab
        className="flex w-full focus:outline-none"
        onClick={() => setSelectedLink(name)}
      >
        <a
          href="#"
          className="flex flex-row items-center gap-2 focus:outline-none hover:translate-x-2 focus:translate-x-2 duration-300"
        >
          <div
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              name === selectedLink ? "bg-rose-500 h-5" : "bg-white"
            }`}
          ></div>
          {name}
        </a>
      </Tab>
    </>
  );
};
export default NavItem;
