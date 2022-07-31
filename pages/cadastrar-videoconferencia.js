import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
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
import { cadastrarVideoconferencia } from '../reducers/videoconferenciaSlice'
import { object, date, string } from 'yup';

const CadastrarVideoconferenciaSchema = object().shape({
    data: date(),
    hora: date(),
    solicitante: string(),
    sala: string(),
    link: string().url("URL inválida"),
});

export default function CadastrarVideoconferenciaPage() {
    const videoconferenciasCount = useSelector(state =>
        state.videoconferencia.videoconferencias.length
    )
    const loading = useSelector(state => state.videoconferencia.loading)
    const error = useSelector(state => state.videoconferencia.error)
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
                        Cadastrar Videoconferência
                    </Typography>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                        <Formik
                            initialValues={{
                                data: '',
                                hora: '',
                                solicitante: '',
                                sala: '',
                                link: '',
                            }}
                            validationSchema={CadastrarVideoconferenciaSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                try {
                                    setSubmitting(false);
                                    const videoconferencia = {
                                        data_e_hora: moment(moment(values.data).format('DD/MM/YYYY') + ' ' + moment(values.hora).format('HH:mm'), 'DD/MM/YYYY HH:mm', true),
                                        solicitante: values.solicitante,
                                        sala: values.sala,
                                        link: values.link,
                                    }
                                    dispatch(cadastrarVideoconferencia(videoconferencia))
                                }
                                catch (error) {
                                    console.log(error)
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, touched, submitForm, isSubmitting }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Field
                                                component={DatePicker}
                                                type="date"
                                                label="Data"
                                                name="data"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                component={TimePicker}
                                                type="time"
                                                label="Hora"
                                                name="hora"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                label="Sala"
                                                name="sala"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="text"
                                                label="Solicitante"
                                                name="solicitante"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="url"
                                                label="Link"
                                                name="link"
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
                    </LocalizationProvider>
                </Box>
            </Container>
        </Layout>
    )
}