import { ConstructionOutlined } from '@mui/icons-material';
import Api from 'api/api';
import { useState, useEffect, forwardRef, useImperativeHandle, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [loading, setLoading] = useState(true);

    //Email and Passowrd Signin
    let signin = async (payload) => {
        let response = await Api.signin(payload);
        if (response.status === 200) {
            setAuthTokens(response.data);
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            navigate('/');
        } else {
            alert('Something went wrong!');
        }
        return response;
    };

    //SignOut to remove tokens and got lo login page
    let signout = () => {
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        navigate('pages/login/login3');
    };

    //Update the tokens
    let updateToken = async () => {
        if (authTokens && authTokens.refresh) {
            let payload = { refresh: authTokens.refresh };
            let response = await Api.refreshToken(payload).catch((err) => {
                //Err while refreshing
            });

            if (response?.status === 200) {
                setAuthTokens(response.data);
                localStorage.setItem('authTokens', JSON.stringify(response.data));
            } else {
                signout();
            }
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

        let intervalTime = 240000;

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, intervalTime);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    let contextData = {
        signin: signin,
        signout: signout
    };
    return <AuthContext.Provider value={contextData}> {loading ? null : children}</AuthContext.Provider>;
};
