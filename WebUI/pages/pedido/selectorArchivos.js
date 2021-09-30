import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

function createData(nombre, doble, color, precio) {
    return { nombre, doble, color, precio };
}

const rows = [
    createData('Informe FINAL FINAL.pdf', true, false, '$150'),
    createData('Diagramas.pdf', false, true, '$205'),
];

const useStyles = makeStyles((theme) => ({
    paper: {
        //marginTop: theme.spacing(8),
        //display: 'flex',
        //flexDirection: 'column',
        //alignItems: 'center',
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
    table: {
        //   minWidth: 700,
    },
}));

export default function Archivos() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>

                <form className={classes.form} noValidate>

                    <div className={classes.subirArchivo}>
                        <input
                            accept="pdf/*"
                            className={classes.subirInput}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button fullWidth variant="contained" color="primary" component="span" className={classes.subirButtom}>
                                Agregar Archivo
                            </Button>
                        </label>
                        <input accept="pdf/*" className={classes.subirInput} id="icon-button-file" type="file" />

                        <Button fullWidth variant="contained" color="primary" component="span" className={classes.submit}>
                            Seleccionar del repositorio
                        </Button>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Archivo</StyledTableCell>
                                    <StyledTableCell align="right">Doble</StyledTableCell>
                                    <StyledTableCell align="right">Color</StyledTableCell>
                                    <StyledTableCell align="right">Precio</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.nombre}</StyledTableCell>
                                        {/* <StyledTableCell align="right">{row.doble}</StyledTableCell> */}
                                        <StyledTableCell align="right">
                                            <Checkbox checked={row.doble} onChange={handleChange} />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Checkbox checked={row.color} onChange={handleChange} />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.precio}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            </div>
        </Container>
    );
}