// React
import React, { useState, useEffect } from 'react';
// Redux and Redux logic
import { useSelector, useDispatch } from 'react-redux'
import { fetchVideoconferencias, fetchVideoconferenciasByDate } from '../../reducers/videoconferenciaSlice'
import { useAuthentication } from '../../hooks/useAuthentication';
// Moment
import moment from 'moment'
// SheetJS
import XLSX from 'xlsx';
// Next
import { useRouter } from 'next/router'

export default function PlanilhaPauta() {
    useAuthentication({ redirectTo: '/login' })
    const router = useRouter();
    const { workingDate } = router.query
    const videoconferencias = useSelector(state => state.videoconferencia.videoconferencias)
    const dispatch = useDispatch()
    const [ done, setDone ] = useState(false);
    useEffect(async () => {
        if (workingDate == undefined) return;
        else {
            if (workingDate !== null) {
                await dispatch(fetchVideoconferenciasByDate(workingDate));
            }
            else {
                await dispatch(fetchVideoconferencias());
            }
        }
    }, [router.query])
    const rows = []
    videoconferencias.map((videoconferencia) => {
        const { data_e_hora, sala, presos } = videoconferencia;
        return videoconferencia.presos.map((preso) => {
            const { nome, periculosidade } = preso
            return rows.push({
                INTERNO: nome,
                ORIGEM: 'UPSobral',
                DESTINO: sala,
                HORARIO: moment(data_e_hora).format('H:mm'),
                PROCEDIMENTO: 'Videoconferência',
                RESP: 'UPSobral',
                PERICUL: periculosidade,
                DATA: moment(data_e_hora).format('D/M/YYYY'),
                TIPO: 'Audiencia'
            });
        });
    });
    const columnsWidth = [
        {wpx: 200},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
        {wpx: 100},
    ]
    const downloadSheet = function (rows) {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        worksheet["!cols"] = columnsWidth;
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Plan1");
        XLSX.writeFile(workbook, `Videoconferencias_${moment(workingDate).format('YYYY-MM-DD')}.xlsx`);
        setDone(true);
    }
    useEffect(async () => {
        workingDate !== undefined && rows.length > 0 && !done && await downloadSheet(rows);
    }, [videoconferencias, router.query, done])
    return null;
}