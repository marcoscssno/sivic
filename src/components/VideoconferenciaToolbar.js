// React
import React from 'react';
// Other components
import VideoconferenciaEditMenu from './VideoconferenciaEditMenu';
// Utils
import Link from '../Link';
// Mui and Mui X
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
// Moment
import moment from 'moment'
// Custom hook
import { useAuthentication } from '../hooks/useAuthentication';

export default function VideoconferenciaToolbar(props) {
    const user = useAuthentication();
    const { videoconferencia } = props;
    const { data_e_hora, sala, solicitante, presos, link } = videoconferencia
    return (
        <Box sx={{
            ':hover': {
                backgroundColor: 'grey.50',
                cursor: 'pointer',
                borderRadius: 'inherit'
            }
        }}>
            <Toolbar>
                <Box
                    component={Link}
                    href={link}
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
                        {moment(data_e_hora).format('D/M/YYYY - H[h]mm[min]')} - {sala}
                    </Typography>
                </Box>
                <Badge badgeContent={presos.length} sx={{ mx: 3 }} color="primary">
                    <PersonIcon color="action" />
                </Badge>
                {user && (
                    <VideoconferenciaEditMenu videoconferencia={videoconferencia} />
                )}
                <Button
                    component={Link}
                    href={videoconferencia.link}
                    target="_blank"
                    rel="noopener"
                    color="primary"
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForward />}
                >
                    Entrar
                </Button>
            </Toolbar>
        </Box>
    )
}
