// React
import React from 'react';
// Other components
import Layout from '../components/Layout';
// Mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { default as Grid, default as Stack } from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Formik
import { useFormik } from 'formik';
// Redux, react-redux and Redux logic
import { useDispatch, useSelector } from 'react-redux';
// Axios
import axios from 'axios';
// Custom hook
import { useAuthentication } from '../hooks/useAuthentication';
// Next
import Router from 'next/router';

export default function LoginPage() {
    useAuthentication({ redirectTo: '/', redirectIfFound: true })
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const [open, setOpen] = React.useState(false);
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
                if (result.data.done) {
                    Router.push('/');
                }
            }
            catch (error) {
                console.log(error.response.data)
                setOpen(true);
                setSubmitting(false);
            }
        }
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const { handleSubmit, values, handleBlur, handleChange, touched, errors, isSubmitting } = formik;
    return (
        <Layout>
            <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 64px)' }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    sx={{
                        minHeight: 'calc(100vh - 64px)'
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ maxWidth: 400 }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Entrar
                            </Typography>
                        </Grid>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Nome de Usuário"
                                            name="username"
                                            value={values.username}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={touched.username && Boolean(errors.username)}
                                            autoFocus={true}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="Senha"
                                            name="password"
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <Button
                                        fullWidth
                                        sx={{ my: 2 }}
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Entrar
                                    </Button>
                                </Stack>
                            </Grid>
                            {(isSubmitting || loading) && <LinearProgress style={LinearProgressStyle} />}
                            {error != null && <p>{error}</p>}
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Nome de usuário ou senha inválido(a)(s)"
            />
        </Layout>
    )
}