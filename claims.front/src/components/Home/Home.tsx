import React from 'react';
import logo from '../../img/logo2.png'; 
import { useUser } from '../Utils/UserContext';
import { FaQuestionCircle, FaEdit, FaChartLine, FaListAlt, FaWpforms } from 'react-icons/fa';

const Home: React.FC = () => {
    const {  coordinatorView } = useUser();

    const menuItems = [
      {
        path: "/dashboard",
        label: coordinatorView ? "Claims" : "My claims",
        description: coordinatorView 
        ?"Inspect, vote and reasign all the claims of the monitoring team"
        :"Inspect and refute all the claims assigned to you",
        icon: FaListAlt,
      },
      {
        path: "/newclaim",
        label: "New claim",
        description:"Make a new Claim",
        icon: FaWpforms,
      },
      ...(coordinatorView
        ? [
            {
              path: "/reports",
              label: "Reports",
              description: "Metrics related to the claims of the monitoring team",
              icon: FaChartLine,
            },
          ]
        : []),
      {
        path: "/topicshelp",
        label: "Topics & Help",
        description: "View and edit the list of claims topic and read the documentation of the aplication",
        icon:FaQuestionCircle,
      },
    ];
    return(
      <div className="bg-gradient-to-r from-neutral-500 to-gray-300 min-h-screen flex flex-col items-center justify-center">
    <img src={logo} className='w-80 p-8'></img>

  <div className="container mx-auto px-4">
    <ul className="flex justify-center space-x-4">
      {menuItems.map((item) => (
        <a href={item.path} className="text-blue-500 font-semibold text-2xl">
        <li
          key={item.path}
          className="group block bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-lg p-6 text-center w-64 h-80"
        >
            <item.icon className="mx-auto mb-2 text-6xl text-blue-500 transition duration-300 group-hover:text-blue-700" />
            {item.label}
           
            <p className="text-lg">{item.description}</p>
        </li>
          </a>
      ))}
    </ul>
  </div>
</div>
    )
}
export default Home;