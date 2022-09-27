// React
import React from 'react';
// Mui
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// Formik,formik-mui and formik-mui-lab
import { Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import { TimePicker } from 'formik-mui-lab';
// Redux, react-redux and Redux logic
import { useSelector } from 'react-redux';

export default function VideoconferenciaForm(props) {
    const loading = useSelector(state => state.videoconferencia.loading)
    const error = useSelector(state => state.videoconferencia.error)
    const success = useSelector(state => state.videoconferencia.success)
    const LinearProgressStyle = {
        marginTop: '32px',
        marginBottom: '16px'
    }
    const { submitForm, isSubmitting, values, submitButtonValue } = props;
    return (
        <Form>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Field
                        component={DatePicker}
                        type="date"
                        label="Data"
                        name="data"
                        autoFocus={true}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Field
                        component={TimePicker}
                        type="time"
                        label="Hora"
                        name="hora"
                    />
                </Grid>
                <Grid item xs={2}>
                    <Field
                        component={TextField}
                        type="text"
                        label="Sala"
                        name="sala"
                    />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        component={TextField}
                        type="text"
                        label="Solicitante"
                        name="solicitante"
                    />
                </Grid>
            </Grid>
            <br />
            <FieldArray name="presos">
                {({ remove, push }) => (
                    <>
                        {values.presos.length > 0 &&
                            values.presos.map((preso, index) => (
                                <React.Fragment key={index}>
                                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                        <Grid item xs={4}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="text"
                                                label="Nome"
                                                name={`presos.${index}.nome`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="text"
                                                label="Ala"
                                                name={`presos.${index}.ala`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="text"
                                                label="Cela"
                                                name={`presos.${index}.cela`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                type="text"
                                                label="Periculosidade"
                                                name={`presos.${index}.periculosidade`}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            {values.presos.length > 1 &&
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => remove(index)}
                                                >
                                                    <RemoveIcon />
                                                </Button>
                                            }
                                        </Grid>
                                        {index == values.presos.length - 1 && (
                                            <Grid item xs={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => push({ nome: '', ala: '', cela: '', periculosidade: '' })}
                                                >
                                                    <AddIcon />
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                    {index + 1 < values.presos.length && (
                                        <br />
                                    )}
                                </React.Fragment>
                            ))
                        }
                    </>
                )}
            </FieldArray>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        component={TextField}
                        type="url"
                        label="Link"
                        name="link"
                    />
                </Grid>
            </Grid>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={() => submitForm}
            >
                {submitButtonValue}
            </Button>
            {(isSubmitting || loading) && <LinearProgress style={LinearProgressStyle} />}
            {error != null && <p>{error}</p>}
        </Form>
    )
}