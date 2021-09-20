/** @jsxImportSource @emotion/react */
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { yupResolver, schema } from './validation';

// test fetch
import { testFetch } from '../../interceptors';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmitHandler = (data) => {
        console.log(data);
        // reset();
        testFetch();
    };

    return (
        <div css={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h3>Login Page</h3>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="form-group">
                    <label>Email</label><br/>
                    <input type="email" required {...register('email')} />
                    <p>{errors && errors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label>Password</label><br/>
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
