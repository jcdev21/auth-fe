/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import { yupResolver, schema } from './validation';
import { Redirect, useHistory } from 'react-router-dom';
// Component
import Button from '../../components/Button';
// config
import { config } from '../../config';
// Context
import { useAuthContext } from '../../features/contexts/AuthContext';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const { state, dispatch } = useAuthContext();
    const history = useHistory();
    console.log('IN COMPONENT LOGIN');

    const onSubmitHandler = async (data) => {
        const response = await fetch(`${config.api_host}/auth/login`, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        const result = await response.json();
        if (result.success) {
            dispatch({
                type: 'SET_AUTH',
                token: result.data.accessToken,
                user: result.data.dataUser,
            });

            reset();
            history.push('/');
        }

        console.log(result);
        reset({
            email: 'jundi21@gmail.com',
            password: 'jundi21',
        });
    };

    if (state.token) {
        return <Redirect to="/" />;
    }

    return (
        <div
            css={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h3>Login Page</h3>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="form-group">
                    <label>Email</label>
                    <br />
                    <input type="email" required {...register('email')} />
                    <p>{errors && errors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <br />
                    <input type="password" required {...register('password')} />
                    <p>{errors && errors.password?.message}</p>
                </div>
                <div className="form-group">
                    <Button submit text="Sign In" />
                </div>
            </form>
        </div>
    );
};

export default Login;
