import React from 'react';
import { Link } from "react-router-dom";
import fau_logo from '../../img/fau_logo.webp'; 
import { useUser } from '../Utils/UserContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { name, coordinatorView, setUser } = useUser();
  const location = useLocation();
  const showNavbar = !['/'].includes(location.pathname);
  const inHome =location.pathname ==='/home'
  if(!showNavbar) return null;
  const menuItems = [...(!inHome?[
    {
      path:"/home",
      label:"Home"
    },
    {
      path: "/dashboard",
      label: coordinatorView ? "Claims" : "My claims",
    },
    {
      path: "/newclaim",
      label: "New claim",
    },
    ...(coordinatorView
      ? [
          {
            path: "/reports",
            label: "Reports",
          },
        ]
      : []),
    {
      path: "/topicshelp",
      label: "Topics & Help",
    },]:[])
  ];
  return (
    <nav className="bg-blue-700 p-4 w-full fixed">
      <div className="flex justify-between items-center">
        <span className="flex justify-start">
          <img className="h-0 w-auto  sm:h-10" src={fau_logo} />
          <p className="text-white md:py-4 text-sm font-medium md:visible">
            User: {name}
          </p>
        </span>
        
        <ul className="flex space-x-4 justify-end">

        <li className="md:collapse">
        <Menu >
          <MenuButton className="data-[active]:bg-blue-200 text-white">
            <FaBars/>
          </MenuButton>
          <MenuItems anchor="bottom" className="absolute mt-2 bg-white shadow-lg rounded-md flex flex-col p-2 w-48">
          {menuItems.map((item,index)=>(
            <MenuItem key={index}>
            <Link
                to={item.path}
                className="text-black hover:bg-blue-200 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            </MenuItem>
          ))}
          </MenuItems>
        </Menu>

        </li>

          {menuItems.map((item, index) => (
            <li key={index} className="hidden md:block">
              <Link
                to={item.path}
                className="text-white hover:bg-blue-200 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium "
                >
                {item.label}
              </Link>
            </li>
          ))}
            <li>
          <Link
            onClick={() => {setUser({
              name: '',
              rol: '',
              login: false,
            }
          );
          document.cookie =  'PHPSESSID=deleted; Max-Age=-99999999;';
          document.cookie =  'auth_token=deleted; Max-Age=-99999999; path=/;';
        }}
        to="/"
        className="bg-red-200 text-red-700 px-3 hover:bg-red-700 hover:text-white py-2 rounded-md text-sm font-medium"
        >
            Logout
          </Link>
        </li>
          
        

        </ul>
        
      </div>
    </nav>
  );
};

export default NavBar;
