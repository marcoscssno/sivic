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
import Link from '../src/Link';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux'
import { styled } from '@mui/material/styles';
import moment from 'moment'
import { fetchVideoconferencias } from '../reducers/videoconferenciaSlice'

const Item = styled(Paper)(({ theme }) => ({
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                                                <IconButton
                                                    id="icon-button"
                                                    edge="end" aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            } disablePadding>
                                                <ListItemButton component={Link} href={videoconferencia.link} target="_blank" rel="noopener">
                                                    <ListItemText primary={videoconferencia.solicitante} secondary={moment(videoconferencia.data_e_hora).format("H[h]mm[min]") + " - " + videoconferencia.sala} />
                                                </ListItemButton>
                                            </ListItem>
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
                                                    href={`/videoconferencia/editar/${videoconferencia._id}`}
                                                    target="_self"
                                                    rel="noopener">
                                                        Editar
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>Excluir</MenuItem>
                                            </Menu>
                                            {index + 1 < videoconferencias.length && <Divider />}
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