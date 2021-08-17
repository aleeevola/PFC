package pfc.WebAPI.Infraestructura.Entidades;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class ArchivoFrecuente {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private int idArchivoFrecuente;
    private String nombre;
    @ManyToOne()
    private Usuario usuario;
    @OneToOne()
    private Archivo archivo;
    
    private Date fechaIngreso;
    private Date fechaBaja;
	
   
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public int getIdArchivoFrecuente() {
		return idArchivoFrecuente;
	}
	public void setIdArchivoFrecuente(int idArchivoFrecuente) {
		this.idArchivoFrecuente = idArchivoFrecuente;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Archivo getArchivo() {
		return archivo;
	}
	public void setArchivo(Archivo archivo) {
		this.archivo = archivo;
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