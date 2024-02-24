import { useState } from "react";
import '/src/Css/Tail.css'
import Profile from './Profile';

const Side = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart" },
    { title: "Inbox", src: "Chat" },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    // { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={`sticky top-0 ${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 z-10 relative duration-300`}
      >
        <img
          src="./src/Image/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/Image/yoga2.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            style={{ width: "50px", height: "50px", objectFit: 'cover' }}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/Image/${Menu.src}.png`} alt={Menu.title} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Profile />
      </div>
    </div>
  );
};

export default Side;
