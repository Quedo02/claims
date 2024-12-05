import { useEffect } from 'react';
import FetchAPI from './FetchAPI';
import { useUser } from './UserContext'; // Importa el contexto de usuario

const useFetchUser = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Usa FetchAPI para obtener los datos del usuario
        const userData = await FetchAPI<{ name: string; rol: string; login: boolean;}>('user', null,null,'auth');

        if (userData && userData.response) {
          // Actualiza el estado global con los datos del usuario
          setUser({
            name: userData.response.name,
            rol: userData.response.rol,
            login: true,
          });
        } else {
          // Si no se obtienen datos, establece el estado por defecto
          setUser({
            name: '',
            rol: '',
            login: false,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Maneja el error y establece el estado en caso de fallo
        setUser({
          name: '',
          rol: '',
          login: false,
        });
      }
    };

    fetchUserData(); // Llamar a la función fetchUserData
  }, [setUser]); // Solo se ejecuta una vez al montar el componente
};

export default useFetchUser;

