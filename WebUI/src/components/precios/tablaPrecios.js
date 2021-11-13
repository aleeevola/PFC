import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles} from '@material-ui/core/styles';
import ActualizarPrecioDialog from './actualizarPrecioDialog';


const useStyles = makeStyles((theme) => ({
    fixedHeight: {
      height: 200,
    },
    boxes: {
      padding: theme.spacing(2),
      fontWeight: 'light',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
    },
    textBoxes: {
      padding: theme.spacing(3),
      fontWeight: '300',
      color: '#606060',
    },
    btnBox: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: "#3dbbedb8",
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      fontWeight: 'regular',
      marginTop: theme.spacing(1),
      padding: theme.spacing(1),
      borderRadius: 2,
    },
    btnVerMas: {
      height: '26px',
      padding: 0,
      textTransform: 'none',
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: '12px',
    },
    div: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }));
  

  export async function getStaticProps() {
    const apiurl = process.env.apiURL;
    const res = await fetch(apiurl + '/precios');
    const precios = await res.json()
    //const usuarios = [
    //  { id: 1, nombre: 'Lucia Arias', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 8, pago: 'Pagado' },
    //]
    console.log("Ejecuta static props");
    console.log(precios);
    if (!precios) {
      return { notFound: true };
    }
  console.log(precios);
    return {
      props: {
        precios,
      },
    };  
  }  


export default function TablaPrecios({ precios }) {
    const classes = useStyles();
    const [pre, setPrecios] = useState([]);
    const [precio, setPrecio] = useState(null);
    const [actualizarPrecio, setActualizarPrecio] = useState(false);

    return (
        <>
        <ActualizarPrecioDialog visible={actualizarPrecio} precio={precio}
                        setVisible={event => {
                            setActualizarPrecio(event);
                        }}
        ></ActualizarPrecioDialog>
            <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                PRECIOS
            </Typography>
            <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Color</TableCell>
                            <TableCell align="center">Tamaño</TableCell>
                            <TableCell align="center">Faz</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {precios.map((item) => (
                            <TableRow>
                                <TableCell align="center" component="th" scope="row">
                                    ${item.precio}
                                </TableCell>
                                <TableCell align="center">
                                    {item.color.replaceAll("_", " ")}
                                </TableCell>
                                <TableCell align="center">
                                    {item.tamanioHoja}
                                </TableCell>
                                <TableCell align="center">
                                    {item.tipoImpresion}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined"
                                        onClick={async (e) => {
                                            const { value } = e.currentTarget
                                            setPrecio({...item});
                                            setActualizarPrecio(true);                                            
                                        }}>Actualizar</Button></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}