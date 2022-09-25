// React
import React from 'react';
// Other components
import Layout from '../../components/Layout'
// Mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// Formik,formik-mui and formik-mui-lab
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import { TimePicker } from 'formik-mui-lab';
// Moment
import moment from 'moment';
import 'moment/locale/pt-br';
// Redux, react-redux and Redux logic
import { useSelector, useDispatch } from 'react-redux';
import { cadastrarVideoconferencia } from '../../reducers/videoconferenciaSlice'
// Custom hooks
import { useAuthentication } from '../../hooks/useAuthentication';
// Next
import Router from 'next/router';

export default function CadastrarVideoconferenciaPage() {
    const user = useAuthentication({ redirectTo: '/login' })
    const videoconferenciasCount = useSelector(state =>
        state.videoconferencia.videoconferencias.length
    )
    const loading = useSelector(state => state.videoconferencia.loading)
    const error = useSelector(state => state.videoconferencia.error)
    const success = useSelector(state => state.videoconferencia.success)
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
                                data: moment().add(1, 'days'),
                                hora: moment().add(1, 'days').hour(8).minute(30),
                                sala: 'Sala 1',
                                solicitante: 'Comarca de Groaíras',
                                presos: [
                                    {
                                        nome: 'Fulano de Tal A',
                                        ala: 'A',
                                        cela: '1',
                                    },
                                    {
                                        nome: 'Fulano de Tal B',
                                        ala: 'B',
                                        cela: '1',
                                    }
                                ],
                                link: 'http://patatap.com'
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    setSubmitting(false);
                                    const videoconferencia = {
                                        data_e_hora: moment(moment(values.data).format('DD/MM/YYYY') + ' ' + moment(values.hora).format('HH:mm'), 'DD/MM/YYYY HH:mm', true),
                                        solicitante: values.solicitante,
                                        sala: values.sala,
                                        presos: values.presos,
                                        link: values.link,
                                        ceatedAt: moment(),
                                        createdBy: user._id,
                                        lastUpdatedAt: moment(),
                                        lastUpdatedBy: user._id
                                    }
                                    await dispatch(cadastrarVideoconferencia(videoconferencia))
                                    Router.push('/');
                                }
                                catch (error) {
                                    console.log(error)
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ submitForm, isSubmitting, values }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Field
                                                component={DatePicker}
                                                type="date"
                                                label="Data"
                                                name="data"
                                                autoFocus={true}
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
                                    <FieldArray name="presos">
                                        {({ insert, remove, push }) => (
                                            <>
                                                {values.presos.length > 0 &&
                                                    values.presos.map((preso, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                                                <Grid item xs={6}>
                                                                    <Field
                                                                        fullWidth
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Nome"
                                                                        name={`presos.${index}.nome`}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Field
                                                                        fullWidth
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Ala"
                                                                        name={`presos.${index}.ala`}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Field
                                                                        fullWidth
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Cela"
                                                                        name={`presos.${index}.cela`}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        <RemoveIcon />
                                                                    </Button>
                                                                </Grid>
                                                                {index == values.presos.length - 1 && (
                                                                    <Grid item xs={1}>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={() => push({ nome: '', ala: '', cela: '' })}
                                                                        >
                                                                            <AddIcon />
                                                                        </Button>
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                            {index + 1 < values.presos.length && (
                                                                <br />
                                                            )}
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </>
                                        )}
                                    </FieldArray>
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
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={() => submitForm}
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