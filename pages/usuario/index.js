import React, { useEffect } from 'react';
import Layout from '../../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../reducers/userSlice'
import { useUser } from '../../hooks/useUser';

export default function GetUsersPage() {
    useUser({ redirectTo: '/login' })
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const users = useSelector(state => state.user.users)
    const dispatch = useDispatch();
    const LinearProgressStyle = {
        marginTop: '32px',
        marginBottom: '16px'
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Usuários
                    </Typography>
                    {users?.map((user, index) => (
                        <Typography variant="body" component="p" gutterBottom>
                            {user.username}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </Layout>
    )
}