import { useState, useEffect } from 'react';
import { useAuthContext } from '../features/contexts/AuthContext';

const originalFetch = window.fetch;
window.fetch = function () {
    let args = arguments;

    return new Promise((resolve, reject) => {
        originalFetch.apply(this, args)
            .then(async (response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const useFetch = (url, options) => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetch, setDataFetch] = useState(null);
    console.log('IN CUSTOM HOOK');

    useEffect(() => {
        console.log('EFFECT HOOK');
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);

                if (response.status === 401) {
                    console.log('ACCESS TOKEN DI REFRESH');
                    const result = await response.clone().json();

                    /**
                     * INTERCEPTOR
                     */
                    if (result.data.message === 'refresh-token') {
                        let newOptions = {...options};
                        newOptions.headers.authorization = 'Bearer ' + result.data.accessToken;

                        dispatch({
                            type: 'SET_AUTH',
                            token: result.data.accessToken,
                            user: result.data.dataUser,
                        });

                        return fetch(url, newOptions)
                            .then(response => response.json())
                            .then(result => setDataFetch(result))
                            .catch((error) => {
                                console.log(error, 'ERROR 2');
                            })
                            .finally(_ => setIsLoading(false));
                    }
                }

                const result = await response.json();
                setDataFetch(result);
                setIsLoading(false);
            } catch (error) {
                // set error
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options, dispatch]);

    return { dataFetch, isLoading };
};

export default useFetch;
