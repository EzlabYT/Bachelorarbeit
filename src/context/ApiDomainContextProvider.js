import React, { useState } from 'react';
import { ApiDomain } from './ApiDomain';

function ApiDomainContextProvider(props) {
    const [apiDomain, setApiDomain] = useState('http://localhost/wordpress');

    return (
        <ApiDomain.Provider value={{apiDomain, setApiDomain}}>
            {props.children}
        </ApiDomain.Provider>
    )
}

export default ApiDomainContextProvider;