// React
import React from 'react';
// Mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Utils
import Link from '../Link'
// Moment
import moment from 'moment';
// Other components
import AuthenticationMenu from './AuthenticationMenu';
// Next.js config
import getConfig from 'next/config';

export default function Layout(props) {
    const { publicRuntimeConfig } = getConfig();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            <Link href="/" color="inherit" underline="none">
                                Sivic
                            </Link>
                        </Typography>
                        <Typography variant="caption" sx={{ ml: 1, flexGrow: 1 }}>
                            {publicRuntimeConfig?.version}
                        </Typography>
                        <Typography sx={{ flexGrow: 1 }}>
                            {moment().format("dddd, D [de] MMMM [de] YYYY")}
                        </Typography>
                        <AuthenticationMenu />
                    </Toolbar>
                </AppBar>
            </Box>
            {props.children}
        </>
    )
}