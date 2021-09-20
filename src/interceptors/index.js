(function () {
    const originalFetch = fetch;
    window.fetch = function () {
        let self = this;
        let args = arguments;

        return originalFetch.apply(self, args).then(async function (data) {
            console.log(data, '===');
            if (data.status === 404) {
                console.log('404');
            } else {
                return data;
            }
        });
    };
})();

export const testFetch = async (url, options) => {
    console.log('BROOo');
    return await fetch('https://jsonplaceholder.typicode.com/todos/2', {
        method: 'POST',
        credentials: 'include',
    });
};
