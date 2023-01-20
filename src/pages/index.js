// React
import React, { useEffect } from 'react';
// Other components
import Layout from '../components/Layout';
import VideoconferenciaFilterToolbar from '../components/VideoconferenciaFilterToolbar';
import VideoconferenciaToolbar from '../components/VideoconferenciaToolbar';
// Utils
import Link from '../Link';
// Mui and Mui X
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// Redux and Redux logic
import { useDispatch, useSelector } from 'react-redux';
import { useAuthentication } from '../hooks/useAuthentication';
import { fetchVideoconferencias } from '../reducers/videoconferenciaSlice';

export default function IndexPage() {
    const user = useAuthentication();
    const dispatch = useDispatch();
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias);
    const loading = useSelector(state => state.videoconferencia.loading);
    const fabStyle = {
        position: 'fixed',
        bottom: 32,
        right: 32,
    };
    useEffect(() => {
        dispatch(fetchVideoconferencias());
    }, []);
    return (
        <Layout>
            <Container maxWidth="xl">
                <VideoconferenciaFilterToolbar />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {loading ? (
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width="100%" height={64} />
                                <Skeleton variant="rectangular" width="100%" height={64} />
                                <Skeleton variant="rectangular" width="100%" height={64} />
                            </Stack>
                        ) : (
                            videoconferencias.length > 0 ? (
                                <Paper sx={{ mx: 1, my: 4 }}>
                                    {videoconferencias.map((videoconferencia, index) => (
                                        <React.Fragment key={index}>
                                            <VideoconferenciaToolbar videoconferencia={videoconferencia} />
                                            {index + 1 < videoconferencias.length && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </Paper>
                            ) : (
                                <Box sx={{ mx: 1, my: 4, p: 3 }}>
                                    <Typography variant="body1">
                                        Não há videoconferência agendada para os parâmetros selecionados.
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Grid>
                </Grid>
                {user && (
                    <Tooltip
                        title="Cadastrar"
                        placement="left"
                    >
                        <Fab
                            color="primary"
                            aria-label="add"
                            style={fabStyle}
                            component={Link}
                            href="/videoconferencia/cadastrar">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                )}
            </Container>
        </Layout >
    );
}