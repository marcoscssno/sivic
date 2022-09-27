// React
import React from 'react';
// Mui
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Redux and Redux logic
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideoconferencias, fetchVideoconferenciasByDate } from '../reducers/videoconferenciaSlice';
// Formik
import { useFormik } from 'formik';
// Moment
import moment from 'moment'
import 'moment/locale/pt-br';

export default function VideoconferenciaFilterForm() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            data: moment()
        },
        onSubmit: (values, { setSubmitting }) => {
            const { data } = values
            try {
                setSubmitting(false);
                if (data == null) {
                    dispatch(fetchVideoconferencias())
                }
                else {
                    dispatch(fetchVideoconferenciasByDate(data))
                }
            }
            catch (error) {
                console.log(error)
                setSubmitting(false);
            }
        }
    })
    const { handleSubmit, values, handleBlur, touched, errors, isSubmitting, setFieldValue } = formik;
    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')}>
                    <DatePicker
                        onChange={(value) => setFieldValue("data", value, true)}
                        label="Data"
                        value={values.data}
                        renderInput={(params) => (
                            <TextField
                                size="small"
                                name="data"
                                onBlur={handleBlur}
                                error={touched.data && Boolean(errors.data)}
                                {...params}
                            />
                        )}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ my: 2, ml: 1 }}
                >
                    Filtrar
                </Button>
            </Box>
        </form>
    )
}
