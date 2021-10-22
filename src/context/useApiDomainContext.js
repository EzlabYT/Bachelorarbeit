import { useContext } from 'react';
import { ApiDomain } from './ApiDomain';

export default function useApiDomainContext() {
    return useContext(ApiDomain);
}