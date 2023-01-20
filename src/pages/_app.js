import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { Provider } from 'react-redux';
import 'moment/locale/pt-br';
import moment from 'moment';
// Socket.io
import io from "socket.io-client";
// Axios
import axios from 'axios';
// Redux, react-redux and Redux logic
import { fetchVideoconferenciasByDate } from '../reducers/videoconferenciaSlice'

let socket;

moment.locale('pt-br');

import store from '../store'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await axios.get("/api/socket");
        socket = io();
        socket.on('REGISTER_MEETING', () => {
            const workingDate = store.getState().videoconferencia.workingDate;
            store.dispatch(fetchVideoconferenciasByDate(workingDate));
        })
    };
    useEffect(() => {
        socketInitializer();
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
