import React, { useEffect } from 'react';
import Layout from '../../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../reducers/userSlice'
import { useRouter } from 'next/router';

export default function GetUserByIdPage() {
    const router = useRouter()
    const { id } = router.query
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const LinearProgressStyle = {
        marginTop: '32px',
        marginBottom: '16px'
    }
    useEffect(() => {
        id && dispatch(getUserById(id))
    }, [id])
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {user.username}
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}