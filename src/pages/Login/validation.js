import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export { yupResolver, schema };