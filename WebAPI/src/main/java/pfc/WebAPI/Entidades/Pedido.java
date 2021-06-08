package pfc.WebAPI.Entidades;
import java.sql.Date;
import java.util.ArrayList; 

public class Pedido {

	private  int idPedido;
    private  int idCliente;
	private  Date fechaIngreso;
    private  Date fechaEstimadaEntrega;
    private  Date fechaEntrega;
    private  char estado;
    private  Boolean pagado;
    private  int idPago;

    private ArrayList<Archivo> Archivos;

	public ArrayList<Archivo> getArchivos() {
		return Archivos;
	}

	public void setArchivos(ArrayList<Archivo> archivos) {
		Archivos = archivos;
	}

	public int getIdPedido() {
		return idPedido;
	}

	public int getIdCliente() {
		return idCliente;
	}

	public Date getFechaIngreso() {
		return fechaIngreso;
	}

	public Date getFechaEstimadaEntrega() {
		return fechaEstimadaEntrega;
	}

	public Date getFechaEntrega() {
		return fechaEntrega;
	}

	public char getEstado() {
		return estado;
	}

	public Boolean getPagado() {
		return pagado;
	}

	public int getIdPago() {
		return idPago;
	}



}