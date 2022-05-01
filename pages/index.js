import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';

export default function IndexPage() {
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
        </Box>
      </Container>
    </Layout>
  )
}