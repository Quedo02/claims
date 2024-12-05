import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginAPI from './LoginAPI';
import { useUser } from '../Utils/UserContext';



const Login: React.FC= () => {
  const {setUser} = useUser();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await LoginAPI(username, password);
      setLoading(false);
      console.log(response); // Remove in production
      if (response.success) {
        // Login successful, use rol and name
        setUser({
          name: response.name ?? '',
          rol: response.rol?? '',
          login: true
        });
        //setUserRole(response.rol || '');
        //setName(response.name || '');
        navigate('/home');
      } else {
        // Login failed, display the error message
        setErrorMessage(response.errorMessage || 'Unknown error occurred');
      }
      
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred during login');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
      setErrorMessage('Caps Lock Activated');
    } else {
      setIsCapsLockOn(false);
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex flex-col justify-center items-center">
    <div className="bg-white p-12 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-bold text-center p-4 mb-8">Claims App</h1>
        {errorMessage && (
          <div className="inline-flex justify-between border-l-4 border-red-400 text-red-700 px-4 py-3 my-2" role="alert">
            <span className="block sm:inline pl-2">{errorMessage}</span>
          </div>
        )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div className='mb-4'>
        <label className='block  font-medium text-gray-400 text-lg'>Username: </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage(''); 
          }}
          className="appearance-none w-full p-2 border border-gray-300 rounded-lg text-lg focus:bg-gray-200"
          />
          </div>
        <div className='mb-4'>
        <label className='block font-medium text-gray-400 text-lg'>Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            !isCapsLockOn && setErrorMessage(''); 
          }}
          onKeyDown={handleKeyDown}
          className="appearance-none w-full p-2 border border-gray-300 rounded-lg text-lg focus:bg-gray-200"
        />
        </div> 
        <div >
        {loading ? (
              <div className="flex justify-center">
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-dashed border-4 border-blue-500 rounded-full" role="status">
                 
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!username.length || !password.length}
                className="w-full bg-blue-600 text-white p-2 rounded-lg disabled:bg-blue-200 hover:bg-blue-700 my-6"
              >
                Login
              </button>
            )}
          </div>
      </form>
    </div>
    </div>
  );
};



export default Login;
