import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DatePicker } from 'formik-mui-lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Formik, Form, Field } from 'formik';
import 'moment/locale/pt-br';
import Link from '../src/Link';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux'
import { styled } from '@mui/material/styles';
import moment from 'moment'
import { fetchVideoconferencias, fetchVideoconferenciasByDate, excluirVideoconferencia } from '../reducers/videoconferenciaSlice'
import ArrowForward from '@mui/icons-material/ArrowForward';

const Item = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(1),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
}));

const IsolatedMenu = props => {
    const [AlertOpen, setAlertOpen] = useState(false);

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        handleClose()
    };
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExcluir = (id) => {
        dispatch(excluirVideoconferencia(id))
        setAlertOpen(false);
        setAnchorEl(null);
    }
    const { videoconferenciaId } = props

    return (
        <React.Fragment>
            <IconButton
                id="icon-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size="small"
                sx={{ marginRight: 1 }}
                onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'icon-button',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    href={`/videoconferencia/editar/${videoconferenciaId}`}
                    target="_self"
                    rel="noopener">
                    Editar
                </MenuItem>
                <MenuItem onClick={handleAlertOpen}>Excluir</MenuItem>
            </Menu>
            <Dialog
                open={AlertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Excluir agendamento de videoconferência?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose}>Não</Button>
                    <Button onClick={() => handleExcluir(videoconferenciaId)} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default function IndexPage() {
    const dispatch = useDispatch()
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    const loading = useSelector(state => state.videoconferencia.loading)
    const error = useSelector(state => state.videoconferencia.error)
    const fabStyle = {
        position: 'fixed',
        bottom: 32,
        right: 32,
    }
    const NaoHaVideoconferencia = styled(Box)(({ theme }) => ({
        margin: theme.spacing(1),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(3),
    }));
    useEffect(() => {
        dispatch(fetchVideoconferencias())
    }, [])
    return (
        <Layout>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Toolbar>
                                <Box sx={{ my: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                                        <Formik
                                            initialValues={{
                                                data: ""
                                            }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                const { data } = values
                                                try {
                                                    setSubmitting(false);
                                                    if (data == null) {
                                                        dispatch(fetchVideoconferencias())
                                                    }
                                                    else {
                                                        dispatch(fetchVideoconferenciasByDate(data))
                                                    }
                                                }
                                                catch (error) {
                                                    console.log(error)
                                                    setSubmitting(false);
                                                }
                                            }}
                                        >
                                            {({ submitForm, isSubmitting }) => (
                                                <Form>
                                                    <Box
                                                        sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                                                        <Field
                                                            component={DatePicker}
                                                            size="small"
                                                            type="date"
                                                            label="Data"
                                                            name="data"
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            disabled={isSubmitting}
                                                            onClick={submitForm}
                                                            sx={{ my: 2, ml: 1 }}
                                                        >
                                                            Filtrar
                                                        </Button>
                                                    </Box>
                                                </Form>
                                            )}
                                        </Formik>
                                    </LocalizationProvider>
                                </Box>
                            </Toolbar>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        {videoconferencias.length > 0 ? (
                            <Item>
                                {videoconferencias.map((videoconferencia, index) => {
                                    const { _id, data_e_hora, sala, solicitante, link } = videoconferencia
                                    return (
                                        <React.Fragment>
                                            <Toolbar
                                                key={index}
                                            >
                                                <Box
                                                    component={Link}
                                                    href={videoconferencia.link}
                                                    target="_blank"
                                                    rel="noopener"
                                                    color="inherit"
                                                    sx={{
                                                        flexGrow: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body"
                                                        noWrap
                                                    >
                                                        {solicitante}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        noWrap
                                                        sx={{ color: "grey.600" }}
                                                    >
                                                        {sala}
                                                    </Typography>
                                                </Box>
                                                <IsolatedMenu videoconferenciaId={_id} />
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="small"
                                                    component={Link}
                                                    href={videoconferencia.link}
                                                    target="_blank"
                                                    rel="noopener"
                                                    endIcon={<ArrowForward />}
                                                >
                                                    Entrar
                                                </Button>
                                            </Toolbar>
                                            {index + 1 < videoconferencias.length && <Divider />}
                                        </React.Fragment>
                                    )
                                })}
                            </Item>
                        ) : (
                            <NaoHaVideoconferencia>
                                <Typography variant="body1">
                                    Não há videoconferência agendada para os parâmetros selecionados.
                                </Typography>
                            </NaoHaVideoconferencia>
                        )}
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
        </Layout >
    )
}