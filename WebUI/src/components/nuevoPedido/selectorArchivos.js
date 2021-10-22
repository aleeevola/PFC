import { React, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NuevoArchivoDialog from './nuevoArchivo'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#6E6E6E',
        color: theme.palette.common.white,
    },
    body: {
        //fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(1, 0, 2),
    },

    subirButtom: {
        margin: theme.spacing(1, 0, 2),
        background: '#9068BE',
    },
    subirArchivo: {
        '& > *': {
            //margin: theme.spacing(1),
        },
    },
    subirInput: {
        display: 'none',
    },
    nombreArchivo: {
        maxWidth: '20ch',
        lineBreak: 'anywhere',
    },
}));

export default function Archivos(props) {
    const classes = useStyles();

    const [editarArchivo, setEditarArchivo] = useState(false);
    const [inputArchivo, setInputArchivo] = useState(null);
    const [numeroPaginas, setNumeroPaginas] = useState(null);

    const [disabledSiguiente, SetDisableSiguiente] = useState(true);
    const [archivos, SetArchivos] = useState([]);

    useEffect(() => {
        if (archivos.length > 0)
            SetDisableSiguiente(false);
    }, [archivos]);

    useEffect(() => {
        if (inputArchivo)
            getNumeroPaginas(inputArchivo);
    }, [inputArchivo]);

    useEffect(() => {
        if (inputArchivo && numeroPaginas) {
            setEditarArchivo(true);
        }
    }, [numeroPaginas]);

    const getNumeroPaginas = async (input) => {
        console.log("getNumeroPaginas");
        if (input) {
            const data = new FormData();
            data.append("file", input);
            const apiurl = process.env.apiURL;

            try {
                const response = await fetch(apiurl + "/archivos/numeroDePaginas", {
                    method: "POST",
                    mode: 'cors',
                    body: data
                });
                if (!response.ok)
                    throw new Error(response.statusText);
                setNumeroPaginas(await response.json());
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    const handleNext = () => {
        props.next();
    };

    const handleBack = () => {
        props.back();
    };

    return (
        <Container >
            <CssBaseline />
            <NuevoArchivoDialog visible={editarArchivo} numeroDePaginas={numeroPaginas} archivo={inputArchivo}
                idPedido={props.idPedido}
                setVisible={event => {
                    setEditarArchivo(event);
                    setInputArchivo(null);
                    setNumeroPaginas(null)
                }}
                addFile={nuevoArchivo => { SetArchivos([...archivos, nuevoArchivo]); props.newIdPedido(nuevoArchivo.pedido.idPedido) }}
            />
            <div >
                <form className={classes.form} noValidate>
                    <div className={classes.subirArchivo}>
                        <input
                            accept="pdf/*"
                            className={classes.subirInput}
                            id="contained-button-file"
                            type="file"
                            onChange={(event) => { (event.target.files && event.target.files[0]) ? setInputArchivo(event.target.files[0]) : setInputArchivo(null) }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button fullWidth variant="contained" color="primary" component="span" className={classes.subirButtom}>
                                Agregar Archivo
                            </Button>
                        </label>
                        <Button fullWidth variant="contained" color="primary" component="span" className={classes.submit}>
                            Seleccionar del repositorio
                        </Button>
                    </div>
                    {(archivos && archivos.length > 0)
                        ? <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Archivo</StyledTableCell>
                                        <StyledTableCell align="center">Formato</StyledTableCell>
                                        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                                            <StyledTableCell align="center">Tamaño</StyledTableCell>
                                        </Box> */}
                                        <StyledTableCell align="center">Tamaño</StyledTableCell>
                                        <StyledTableCell align="center">Precio</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {archivos.map((row) => (
                                        <StyledTableRow key={row.nombre}>
                                            <StyledTableCell component="th" scope="row" className={classes.nombreArchivo}>{row.nombre}</StyledTableCell>
                                            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                                                <StyledTableCell component="th" scope="row" align="center">{row.tipoImpresion}</StyledTableCell>
                                            </Box> */}
                                            <StyledTableCell component="th" scope="row" align="center">{row.tipoImpresion}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" align="center">{row.tamanioHoja}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" align="center">${row.precio}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <p><b>Suba un archivo para continuar</b></p>
                    }
                    {(archivos && archivos.length > 0) && <p><b>Total: ${archivos.reduce((a, v) => a = a + v.precio, 0)}</b></p>}
                </form>
            </div>
            <Grid item sm={12}  >
                <Box m={2}>
                    <Button disabled className={classes.button}>
                        Atras
                    </Button>

                    <Button
                        disabled={disabledSiguiente}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Siguiente
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}