// React
import React, { useEffect } from 'react'
// Next
import { useRouter } from 'next/router'
// Other components
import Layout from '../../../components/Layout'
import VideoconferenciaForm from '../../../components/VideoconferenciaForm';
// Mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Formik, formik-mui, formik-mui-lab
import { Formik } from 'formik';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// Moment
import moment from 'moment';
import 'moment/locale/pt-br';
// Redux, react-redux and Redux logic
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideoconferencia, editarVideoconferencia } from '../../../reducers/videoconferenciaSlice';
// Custom hook
import { useAuthentication } from '../../../hooks/useAuthentication';
// Socket.io
import io from "socket.io-client";
import { toTitleCase } from '../../../utils/textHelper';


export default function EditarVideoconferenciaPage() {
    const user = useAuthentication({ redirectTo: '/login' });
    const router = useRouter();
    const { id } = router.query;
    const videoconferencia = useSelector(state => state.videoconferencia.videoconferencia);
    const socket = io();
    let presos = [
        {
            nome: '',
            ala: '',
            cela: '',
            periculosidade: ''
        }
    ]
    if (videoconferencia.presos.length > 0) {
        presos = videoconferencia.presos.map((preso) => {
            return preso = {
                nome: preso.nome ? preso.nome : '',
                ala: preso.ala ? preso.ala : '',
                cela: preso.cela ? preso.cela : '',
                periculosidade: preso.periculosidade ? preso.periculosidade : ''
            }
        });
    }
    const initialValues = {
        data: videoconferencia.data_e_hora,
        hora: videoconferencia.data_e_hora,
        solicitante: videoconferencia.solicitante,
        sala: videoconferencia.sala,
        presos: presos,
        link: videoconferencia.link
    }
    const success = useSelector(state => state.videoconferencia.success)
    const dispatch = useDispatch();
    useEffect(() => {
        /* Fix for bug when first rendering shows router.query.id as undefined and triggers Axios error */
        id && dispatch(fetchVideoconferencia(id))
    }, [router.query])
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Editar Videoconferência
                    </Typography>
                    <Typography variant="body2" component="p" gutterBottom>
                        Cadastrado em {moment(videoconferencia.createdAt).format('D/M/Y [às] H[h]mm[min]')} por {videoconferencia.createdBy}
                    </Typography>
                    <Typography variant="body2" component="p" gutterBottom>
                        Atualizado pela última vez em {moment(videoconferencia.lastUpdatedAt).format('D/M/Y [às] H[h]mm[min]')} por {videoconferencia.lastUpdatedBy}
                    </Typography>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            onSubmit={(values, { setSubmitting }) => {
                                try {
                                    setSubmitting(false);
                                    const newVideoconferencia = {
                                        data_e_hora: moment(moment(values.data).format('DD/MM/YYYY') + ' ' + moment(values.hora).format('HH:mm'), 'DD/MM/YYYY HH:mm', true),
                                        solicitante: toTitleCase(values.solicitante),
                                        sala: toTitleCase(values.sala),
                                        presos: values.presos.map(preso => {
                                            return {
                                                nome: toTitleCase(preso.nome),
                                                ala: toTitleCase(preso.ala),
                                                cela: toTitleCase(preso.cela),
                                                periculosidade: toTitleCase(preso.periculosidade)
                                            }
                                        }),
                                        link: values.link,
                                        lastUpdatedAt: moment(),
                                        lastUpdatedBy: user._id
                                    }
                                    dispatch(editarVideoconferencia({ id: id, videoconferencia: newVideoconferencia }))
                                    
                                    // To do: Emit 'REGISTER_MEEETING' only when state.videoconferencia.success == true;
                                    socket.emit('REGISTER_MEETING');
                                    
                                    success && router.push('/')
                                }
                                catch (error) {
                                    console.log(error)
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ submitForm, isSubmitting, values }) => {
                                return (
                                    <VideoconferenciaForm submitForm={submitForm} isSubmitting={isSubmitting} values={values} submitButtonValue="Editar" />
                                )
                            }}
                        </Formik>
                    </LocalizationProvider>
                </Box>
            </Container>
        </Layout>
    )
}
