import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import useFetchUser from './components/Utils/useFetchUser';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import TopicsHelp from './components/TopicsHelp/TopicsHelp';
import Reports from './components/Reports/Reports';
import NavBar from './components/NavBar/NavBar';
import NewClaim from './components/NewClaim/NewClaim';
import Home from './components/Home/Home';
import { UserProvider, useUser } from './components/Utils/UserContext';

const basename = process.env.NODE_ENV === 'production' ? '/Claims_v2/claims.front' : '/';

const App: React.FC = () => {
  const { login } = useUser();
  useFetchUser();
  //const location = useLocation();
  return (
    <div className="wrapper }">
      <BrowserRouter basename={basename}>
        
          <NavBar/>

       <div className={login ? "pt-12" : ""}>
        
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topicshelp" element={<TopicsHelp />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/newclaim" element={<NewClaim />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWrapper;


