import * as React from 'react';
import Layout from '../../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../reducers/userSlice'

export default function CreateUserPage() {
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const dispatch = useDispatch();
    const LinearProgressStyle = {
        marginTop: '32px',
        marginBottom: '16px'
    }
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cadastrar Usuário
                    </Typography>
                    <br />
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                try {
                                    setSubmitting(false);
                                    const userData = {
                                        username: values.username,
                                        password: values.password
                                    }
                                    dispatch(createUser(userData))
                                }
                                catch (error) {
                                    console.log(error)
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ submitForm, isSubmitting }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                label="Nome de Usuário"
                                                name="username"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                component={TextField}
                                                type="password"
                                                label="Senha"
                                                name="password"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Cadastrar
                                    </Button>
                                    {(isSubmitting || loading) && <LinearProgress style={LinearProgressStyle} />}
                                    {error != null && <p>{error}</p>}
                                </Form>
                            )}
                        </Formik>
                </Box>
            </Container>
        </Layout>
    )
}