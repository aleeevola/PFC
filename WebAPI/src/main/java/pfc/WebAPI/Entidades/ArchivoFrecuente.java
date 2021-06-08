package pfc.WebAPI.Entidades;
import java.sql.Date;

public class ArchivoFrecuente {

    private  int idArchivo;
    private  String nombre;
    private  int idUsuarioAlta;
    private Date fechaIngreso;
    private Date fechaBaja;
	
    
    public int getIdArchivo() {
		return idArchivo;
	}
	public void setIdArchivo(int idArchivo) {
		this.idArchivo = idArchivo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getIdUsuarioAlta() {
		return idUsuarioAlta;
	}
	public void setIdUsuarioAlta(int idUsuarioAlta) {
		this.idUsuarioAlta = idUsuarioAlta;
	}
	public Date getFechaIngreso() {
		return fechaIngreso;
	}
	public void setFechaIngreso(Date fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}
	public Date getFechaBaja() {
		return fechaBaja;
	}
	public void setFechaBaja(Date fechaBaja) {
		this.fechaBaja = fechaBaja;
	}


}