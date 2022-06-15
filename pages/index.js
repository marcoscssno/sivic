import * as React from 'react';
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '../src/Link';
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import moment from 'moment'

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: theme.spacing(1)
}));

export default function IndexPage() {
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    return (
        <Layout>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ marginTop: "16px" }}>{moment().format("dddd, D [de] MMMM [de] YYYY")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            {videoconferencias.length > 0 ? (
                                <List>
                                    {videoconferencias.map(videoconferencia => (
                                        <>
                                            <ListItem secondaryAction={
                                                <IconButton edge="end" component={Link} href={videoconferencia.link} target="_blank" rel="noopener">
                                                    <ArrowForwardIcon />
                                                </IconButton>
                                            }>
                                                <ListItemText primary={videoconferencia.solicitante} secondary={moment(videoconferencia.hora).format("H[h]mm[min]") + " - " + videoconferencia.sala} />
                                            </ListItem>
                                        </>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body1">
                                    Não há videoconferência agendada.
                                </Typography>
                            )}
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}