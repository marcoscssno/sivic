import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function IndexPage() {
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Hello, World!
                    </Typography>
                    <Link href="/cadastrar-videoconferencia" color="secondary">
                        Cadastrar Videoconferência
                    </Link>
                    { videoconferencias.length }
                    { videoconferencias.length > 0 && videoconferencias.map(videoconferencia => (
                        <p>{ moment(videoconferencia.hora).format('H[h]m[min]s[seg]') }</p>
                    ))}
                </Box>
            </Container>
        </Layout>
    )
}