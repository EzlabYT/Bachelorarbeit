import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import * as Cookies from 'js-cookie';

// Diese Komponente dient zur Kontrolle des Userlogins
// Sie stellt Funktionen zum User-login und -logout bereit
// Über einen Cookie wird geprüft ob der User eingeloggt ist oder nicht. Das ganze wird in einem State gepeichert.

function AuthContextProvider(props) {

    const [isAuthenticated, setIsAuthenticated] = useState()

    useEffect(() => {
        setIsAuthenticated(Cookies.get('session') !== undefined)
    }, [])

    function handleLogin() {
        setIsAuthenticated(true)
    }

    function handleLogout() {
        Cookies.remove('session')
        setIsAuthenticated(false)
        localStorage.removeItem('token');
        localStorage.removeItem('user_nicename');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_display_name');
    }

    return (
        <AuthContext.Provider value={{
            authState: isAuthenticated,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
