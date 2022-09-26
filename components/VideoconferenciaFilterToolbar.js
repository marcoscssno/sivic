// React
import React from 'react';
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

export default function VideoconferenciaFilterToolbar() {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{ mx: 1, my: 4 }}>
                    <Toolbar>
                        <Box sx={{ my: 2, flexGrow: 1 }}>
                            <VideoconferenciaFilterForm />
                        </Box>
                        <Button variant="contained" component={Link} href="/imprimir/pauta" target="_blank" endIcon={<PrintIcon />}>
                            Imprimir
                        </Button>
                    </Toolbar>
                </Paper>
            </Grid>
        </Grid>
    )
}