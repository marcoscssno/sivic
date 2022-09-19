import React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { TryOutlined } from '@mui/icons-material';
import { useAuthentication } from '../hooks/useAuthentication';
import Router from 'next/router'

export default function LoginPage() {
    useAuthentication({ redirectTo: '/', redirectIfFound: true })
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const dispatch = useDispatch();
    const LinearProgressStyle = {
        marginTop: '32px',
        marginBottom: '16px'
    }
    const validate = (values) => {
        const errors = {};
        const { username, password } = values;
        if (!username) {
            errors.username = 'Campo obrigatório';
        }
        if (!password) {
            errors.password = 'Campo obrigatório';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: validate,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(false);
                const userData = {
                    username: values.username,
                    password: values.password
                }
                const result = await axios.post('/api/login', userData);
                console.log(result);
                if (result.data.done) {
                    Router.push('/');
                }
            }
            catch (error) {
                console.log(error.response.data)
                setSubmitting(false);
            }
        }
    })
    const { handleSubmit, values, handleBlur, handleChange, touched, errors, isSubmitting } = formik;
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <br />
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                            <TextField
                                                label="Nome de Usuário"
                                                name="username"
                                                value={values.username}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={touched.username && Boolean(errors.username)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                type="password"
                                                label="Senha"
                                                name="password"
                                                value={values.password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={touched.password && Boolean(errors.password)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Entrar
                                    </Button>
                                    {(isSubmitting || loading) && <LinearProgress style={LinearProgressStyle} />}
                                    {error != null && <p>{error}</p>}
                                </form>
                </Box>
            </Container>
        </Layout>
    )
}