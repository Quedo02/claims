import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Definir la estructura de los datos del usuario
interface UserContextType {
  name: string;
  rol: string;
  login: boolean;
  coordinatorView: boolean;
  setUser: (user: UserData) => void;
}

interface UserData {
  name: string;
  rol: string;
  login: boolean;
}
1
// Crear un contexto con valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>({ name: '', rol: '', login: false });
  const coordinatorView = user.rol === '1' || user.rol === '9';

  return (
    <UserContext.Provider value={{ ...user, coordinatorView, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
