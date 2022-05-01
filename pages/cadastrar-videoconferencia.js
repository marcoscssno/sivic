import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CadastrarVideoconferenciaPage() {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cadastrar Videoconferência
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}