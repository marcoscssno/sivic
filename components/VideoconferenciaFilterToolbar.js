// React
import React, { useState, useEffect } from 'react';
// Other components
import VideoconferenciaFilterForm from '../components/VideoconferenciaFilterForm';
// Utils
import Link from '../src/Link';
// Mui and Mui X
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import DescriptionIcon from '@mui/icons-material/Description';
// Custom hook
import { useAuthentication } from '../hooks/useAuthentication';
// Redux and Redux logic
import { useSelector } from 'react-redux';

export default function VideoconferenciaFilterToolbar() {
    const user = useAuthentication();
    const workingDate = useSelector(state => state.videoconferencia.workingDate)
    const [shouldPrint, setShouldPrint] = useState(false);
    useEffect(() => {
        if (workingDate !== null) {
            setShouldPrint(true);
        }
        else {
            setShouldPrint(false);
        }
    }, [workingDate])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{ mx: 1, my: 4 }}>
                    <Toolbar>
                        <Box sx={{ my: 2, flexGrow: 1 }}>
                            <VideoconferenciaFilterForm />
                        </Box>
                        {user && (
                            <>
                                <Button variant="contained" sx={{mx: 2}} disabled={!shouldPrint} component={Link} href={`/planilha/pauta/?workingDate=${workingDate}`} target="_blank" endIcon={<DescriptionIcon />}>
                                    Planilha
                                </Button>
                                <Button variant="contained" disabled={!shouldPrint} component={Link} href={`/imprimir/pauta/?workingDate=${workingDate}`} target="_blank" endIcon={<PrintIcon />}>
                                    Imprimir
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </Paper>
            </Grid>
        </Grid>
    )
}
