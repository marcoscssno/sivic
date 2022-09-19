// React
import React from 'react';
// Mui
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CircularProgress from '@mui/material/CircularProgress';
// Redux Logic
import { useAuthentication } from '../hooks/useAuthentication';
// Redux
import { useSelector } from 'react-redux';
// Utils
import Link from '../src/Link'

const LoadingAuthentication = () => {
    return <CircularProgress size={25} sx={{ ml: 1 }} color="inherit" />
}

const UserMenu = (props) => {
    const { user } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
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
                <MenuItem onClick={handleClose} component={Link} href="/api/logout">Sair</MenuItem>
            </Menu>
        </>
    )
}

const LoginMenu = () => {
    return (
        <Button
            component={Link}
            href="/login"
            variant="text"
            color="inherit"
            sx={{ ml: 1 }}
        >
            Entrar
        </Button>
    )
}

export default function AuthenticationMenu() {
    const user = useAuthentication()
    const authenticationIsLoading = useSelector(state => state.user.loading)

    if (authenticationIsLoading) {
        return <LoadingAuthentication />
    }
    else {
        if (user) {
            return <UserMenu user={user} />
        }
        else {
            return <LoginMenu />
        }
    }
}