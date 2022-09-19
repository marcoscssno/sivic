import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from '../src/Link'
import moment from 'moment';
import { useUser } from '../hooks/useUser';

export default function Layout(props) {
    const user = useUser()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href="/" color="inherit" underline="none">
                                Sivic
                            </Link>
                        </Typography>
                        <Typography>
                            {moment().format("dddd, D [de] MMMM [de] YYYY")}
                        </Typography>
                        {user ? (
                            <div>
                                <Button
                                    variant="text"
                                    startIcon={<AccountCircle />}
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    sx={{ ml: 1 }}
                                >
                                    {user.username}
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} href="/api/logout">Sair</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button
                                component={Link}
                                href="/login"
                                variant="text"
                                color="inherit"
                                sx={{ ml: 1 }}
                            >
                                Entrar
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            {props.children}
        </>
    )
}