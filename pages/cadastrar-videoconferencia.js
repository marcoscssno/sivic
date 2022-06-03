import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import { TimePicker } from 'formik-mui-lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../src/Link';
import { cadastrar } from '../reducers/videoconferenciaSlice'

export default function CadastrarVideoconferenciaPage() {
    const videoconferenciasCount = useSelector(state =>
        state.videoconferencia.videoconferencias.length
    )
    const dispatch = useDispatch();
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Link href="/" color="secondary">
                        Início
                    </Link>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cadastrar Videoconferência ({videoconferenciasCount})
                    </Typography>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                        <Formik
                            initialValues={{
                                data: new Date(),
                                hora: new Date(),
                                solicitante: '',
                                sala: '',
                                link: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    //alert(JSON.stringify(values, null, 2));
                                    console.log(values);
                                    dispatch(cadastrar(values));
                                }, 500);
                            }}
                        >
                            {({ submitForm, isSubmitting }) => (
                                <Form>
                                    <Field
                                        component={DatePicker}
                                        type="date"
                                        label="Data"
                                        name="data"
                                    />
                                    <br />
                                    <br />
                                    <Field
                                        component={TimePicker}
                                        type="time"
                                        label="Hora"
                                        name="hora"
                                    />
                                    <br />
                                    <br />
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Solicitante"
                                        name="solicitante"
                                    />
                                    <br />
                                    <br />
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Sala"
                                        name="sala"
                                    />
                                    <br />
                                    <br />
                                    <Field
                                        component={TextField}
                                        type="url"
                                        label="Link"
                                        name="link"
                                    />
                                    <br />
                                    <br />
                                    {isSubmitting && <LinearProgress />}
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Cadastrar
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