import { createContext, useEffect, useReducer } from 'react';
import axios from 'src/utils/axios';
import customAxios from 'src/utils/customAxios';

import PropTypes from 'prop-types';


const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    // console.log('Inicializando')
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    // console.log('Login')
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  
  LOGOUT: (state) => ({
    
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        
        if (accessToken) {
          setSession(accessToken);
          // console.log(accessToken)

          const response = await customAxios.get('/authentication/personal',{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });

          
          if(response.status === 200){
            const { user } = response.data;
            // console.log(user)
            setSession(accessToken);

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user
              }
            });

          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);


  const login = async (correo, contrasena) => {
    // console.log(correo,contrasena)
    const response = await customAxios.post('/authentication/login', {
      correo: correo,
      contrasena: contrasena
    },{
      validateStatus: (status) => status < 500
    });

    if(response.status === 200){
      const { accessToken, user } = response.data;
      setSession(accessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      });

    }else{
      // console.log('DESLOGEADO EN JWT 2')
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  

  };

  const logout = async () => {
    setSession(null);
    // console.log('DESLOGEADO EN JWT 3')
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password) => {
    const response = await axios.post('/api/account/register', {
      email,
      name,
      password
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
