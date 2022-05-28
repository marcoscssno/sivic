import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

export default function CadastrarVideoconferenciaPage() {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cadastrar Videoconferência
                    </Typography>
                    <Formik
                        initialValues={{
                            data_hora: '',
                            solicitante: '',
                            link: '',
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                alert(JSON.stringify(values, null, 2));
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form>
                                <Field
                                    component={TextField}
                                    name="data_hora"
                                    type="datetime-local"
                                    label=""
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Solicitante"
                                    name="solicitante"
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Sala"
                                    name="sala"
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="url"
                                    label="Link"
                                    name="link"
                                />
                                {isSubmitting && <LinearProgress />}
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </Layout>
    )
}