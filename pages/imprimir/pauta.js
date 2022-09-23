// React
import React, { useEffect } from 'react';
// Redux and Redux logic
import { useSelector, useDispatch } from 'react-redux'
import { fetchVideoconferencias } from '../../reducers/videoconferenciaSlice'
import { useAuthentication } from '../../hooks/useAuthentication';
// Moment
import moment from 'moment'
// PDFMake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function IndexPage() {
    useAuthentication({ redirectTo: '/login' })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchVideoconferencias());
    }, [])
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    const styles = {
        header: {
            fontSize: 12,
            bold: true
        },
        subheader: {
            fontSize: 12
        }
    }
    const videoconferenciasForPrinting = () => {
        return videoconferencias.map((videoconferencia, index) => {
            const { solicitante, data_e_hora, sala } = videoconferencia;
            return [
                {
                    text: solicitante,
                    style: 'header'
                },
                {
                    text: moment(data_e_hora).format('DD/MM/YYYY H[h]m[min]') + " - " + sala + '\n\n',
                    style: 'subheader'
                }
            ]
        })
    }
    const printContent = () => {
        const docDefinition = {
            info: {
                title: 'Relatório'
            },
            pageSize: 'A4',
            footer: {
                text: 'Impresso em ' + moment().format('DD/MM/YYYY [às] H[h]m[min]') + '.',
                fontSize: 10,
                margin: [40, 0]
            },
            content: [
                {
                    text: ['Relatório', '\n', moment().format('DD/MM/YYYY') + '\n\n'],
                    alignment: 'center',
                    bold: true
                },
                videoconferenciasForPrinting()
            ],
            styles
        }
        pdfMake.createPdf(docDefinition).open({}, window)
    }
    useEffect(() => {
        videoconferencias.length > 0 && printContent();
    }, [videoconferencias])
    return null;
}