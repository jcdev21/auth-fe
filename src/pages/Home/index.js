import { useState, useEffect } from 'react';
import { useAuthContext } from '../../features/contexts/AuthContext';
import useFetch from '../../interceptors/useFetch';

const Home = () => {
    const { state } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [url, setUrl] = useState('http://localhost:8000/users');
    const [fetchOptions, setFetchOptions] = useState({
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: state.token ? 'Bearer ' + state.token : '',
        },
    });
    const { dataFetch, isLoading } = useFetch(url, fetchOptions);
    console.log('IN COMPONENT HOME');

    useEffect(() => {
        console.log('EFFECT HOME');
        console.log(dataFetch);
        if (dataFetch) {
            setUsers(dataFetch.data);
        } else {
            setUsers([]);
        }
    }, [dataFetch]);

    const reFetch = async () => {
        setUrl('http://localhost:8000/users');
        setFetchOptions({
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: state.token ? 'Bearer ' + state.token : '',
            },
        });
    }

    return (
        <div>
            <button onClick={reFetch}>ReFetch</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users &&
                        users.map((user) => (
                            <li key={user.id}>{user.fullname}</li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
