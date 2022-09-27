// React
import React from 'react';
// Other components
import Layout from '../../components/Layout'
import VideoconferenciaForm from '../../components/VideoconferenciaForm';
// Mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// Formik,formik-mui and formik-mui-lab
import { Formik, Form, Field, FieldArray } from 'formik';
// Moment
import moment from 'moment';
import 'moment/locale/pt-br';
// Redux, react-redux and Redux logic
import { useDispatch } from 'react-redux';
import { cadastrarVideoconferencia } from '../../reducers/videoconferenciaSlice'
// Custom hooks
import { useAuthentication } from '../../hooks/useAuthentication';
// Next
import Router from 'next/router';

export default function CadastrarVideoconferenciaPage() {
    const user = useAuthentication({ redirectTo: '/login' })
    const dispatch = useDispatch();
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
                                        periculosidade: 'Baixa',
                                    },
                                    {
                                        nome: 'Fulano de Tal B',
                                        ala: 'B',
                                        cela: '1',
                                        periculosidade: 'Baixa',
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
                                <VideoconferenciaForm submitForm={submitForm} isSubmitting={isSubmitting} values={values} submitButtonValue="Cadastrar" />
                            )}
                        </Formik>
                    </LocalizationProvider>
                </Box>
            </Container>
        </Layout>
    )
}