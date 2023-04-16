import { useState, useEffect, forwardRef, useImperativeHandle, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import Api from 'api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const _storeTokens = (data) => {
        setAuthTokens(data);
        localStorage.setItem('authTokens', JSON.stringify(data));
        let decoded_data = jwt_decode(data.access);
        if (decoded_data.user) {
            setUser(decoded_data.user);
        }
    };
    const _removeTokens = () => {
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
    };

    //Email and Passowrd Signin
    let login = async (payload) => {
        _removeTokens();
        let response = await Api.login(payload);
        if (response.status === 200) {
            _storeTokens(response.data);
            navigate('/');
        } else {
            alert('Something went wrong!');
        }
        return response;
    };

    //LogOut to remove tokens and got lo login page
    let logout = () => {
        let tokens = JSON.parse(localStorage.getItem('authTokens'));
        if (tokens) {
            _removeTokens();
            let refreshToken = tokens.refresh;
            Api.logout({ refresh: refreshToken });
        }
        navigate('pages/login');
    };

    //Update the tokens
    let updateToken = async () => {
        if (authTokens && authTokens.refresh) {
            let payload = { refresh: authTokens.refresh };
            let response = await Api.refreshToken(payload).catch((err) => {
                //Err while refreshing
                logout();
            });

            if (response?.status === 200) {
                _storeTokens(response.data);
            } else {
                logout();
            }
        } else {
            logout();
        }
        if (loading) {
            setLoading(false);
        }
    };

    //Call updateToken every certain interval in order to keep the tokens active
    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const intervalTime = process.env.REACT_APP_REFRESH_TIMEOUT;

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
            //  }, intervalTime);
        }, 5000);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    let contextData = {
        user: user,
        login: login,
        logout: logout
    };
    return <AuthContext.Provider value={contextData}> {loading ? null : children}</AuthContext.Provider>;
};
