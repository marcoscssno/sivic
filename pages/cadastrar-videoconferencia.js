import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { DateTimePicker } from 'formik-mui-lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function CadastrarVideoconferenciaPage() {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cadastrar Videoconferência
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                        <Formik
                            initialValues={{
                                data_hora: new Date(),
                                solicitante: '',
                                link: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    //alert(JSON.stringify(values, null, 2));
                                    console.log(JSON.stringify(values));
                                }, 500);
                            }}
                        >
                            {({ submitForm, isSubmitting }) => (
                                <Form>
                                    <Field
                                        component={DateTimePicker}
                                        name="data_hora"
                                        type="datetime-local"
                                        label="Data e Hora"
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
                    </LocalizationProvider>
                </Box>
            </Container>
        </Layout>
    )
}