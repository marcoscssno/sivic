import React, { useEffect } from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Link from '../src/Link';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux'
import { styled } from '@mui/material/styles';
import moment from 'moment'
import { fetchVideoconferencias } from '../reducers/videoconferenciaSlice'

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
}));

export default function IndexPage() {
    const dispatch = useDispatch()
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    const loading = useSelector(state => state.videoconferencia.loading)
    const error = useSelector(state => state.videoconferencia.error)
    useEffect(() => {
        dispatch(fetchVideoconferencias())
    }, [])
    const fabStyle = {
        position: 'fixed',
        bottom: 32,
        right: 32,
    }
    const NaoHaVideoconferenciaStyle = {
        marginRight: '32px',
        marginLeft: '32px',
        marginTop: '16px',
        marginBottom: '16px'
    }
    return (
        <Layout>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            {videoconferencias.length > 0 ? (
                                <List>
                                    {videoconferencias.map((videoconferencia, index) => (
                                        <>
                                            <ListItem key={videoconferencia._id} secondaryAction={
                                                <IconButton edge="end" component={Link} href={videoconferencia.link} target="_blank" rel="noopener">
                                                    <ArrowForwardIcon />
                                                </IconButton>
                                            }>
                                                <ListItemText primary={videoconferencia.solicitante} secondary={moment(videoconferencia.data_e_hora).format("H[h]mm[min]") + " - " + videoconferencia.sala} />
                                            </ListItem>
                                            {index + 1 < videoconferencias.length && <Divider /> }
                                        </>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body1" style={NaoHaVideoconferenciaStyle}>
                                    Não há videoconferência agendada.
                                </Typography>
                            )}
                        </Item>
                    </Grid>
                </Grid>
                <Fab
                    color="primary"
                    aria-label="add"
                    style={fabStyle}
                    component={Link}
                    href="/cadastrar-videoconferencia">
                    <AddIcon />
                </Fab>
            </Container>
        </Layout>
    )
}