const originalFetch = window.fetch;
export default window.fetch = function () {
    let args = arguments;

    return new Promise((resolve, reject) => {
        originalFetch.apply(this, args)
            .then(async (response) => {
                console.log('THEN ORIGINAL OO');
                if (response.status === 401) {
                    console.log('ACCESS TOKEN DI REFRESH');
                    const result = await response.clone().json();

                    /**
                     * INTERCEPTOR
                     */
                    if (result.data.message === 'refresh-token') {
                        let newHeaders = args[1].headers;
                        newHeaders = {...newHeaders, authorization: 'Bearer ' + result.data.accessToken};
                        let args1 = {...args[1], headers: newHeaders};

                        // CHANGE ACCESS TOKEN LOCALSTORAGE
                        localStorage.setItem('access-token', result.data.accessToken);

                        return fetch(args[0], args1)
                            .then(response2 => {
                                console.log(response2, 'RES 2');
                                resolve(response2);
                            })
                            .catch((error2) => {
                                reject(error2);
                            })
                    }
                }

                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
