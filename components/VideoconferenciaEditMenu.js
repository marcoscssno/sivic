// React
import React, { useState } from 'react';
// Mui
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
// Utils
import Link from '../src/Link';
// Redux and Redux logic
import { useDispatch } from 'react-redux';
import { excluirVideoconferencia } from '../reducers/videoconferenciaSlice';
// Moment
import moment from 'moment';
// Socket.io
import io from "socket.io-client";


export default function VideoconferenciaEditMenu (props) {
    const [AlertOpen, setAlertOpen] = useState(false);
    const socket = io();

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

        // To do: Emit 'REGISTER_MEEETING' only when state.videoconferencia.success == true;
        socket.emit('REGISTER_MEETING');


        setAlertOpen(false);
        setAnchorEl(null);
    }
    const { videoconferencia } = props
    const id = videoconferencia._id
    const { solicitante, data_e_hora, sala } = videoconferencia

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
                    vertical: 'bottom',
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
                    href={`/videoconferencia/editar/${id}`}
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
                        Excluir o agendamento de videoconferência abaixo?
                        <br />
                        <br />
                        {solicitante}
                        <br />
                        {moment(data_e_hora).format('D/M/YYYY - H[h]mm[min]')} - {sala}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose}>Não</Button>
                    <Button onClick={() => handleExcluir(id)} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}