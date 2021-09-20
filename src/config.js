import dotenv from 'dotenv';

dotenv.config();

const config = {
    api_host: process.env.REACT_APP_API_HOST,
    site_title: process.env.REACT_APP_SITE_TITLE,
    owner: process.env.REACT_APP_OWNER,
};

const configTheme = {
    colors: {
        first: '#d4e09b',
        second: '#f6f4d2',
        third: '#cbdfbd',
        four: '#f19c79',
        five: '#a44a3f',
    },
};

export { config, configTheme };
