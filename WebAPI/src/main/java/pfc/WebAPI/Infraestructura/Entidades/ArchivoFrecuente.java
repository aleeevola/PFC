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
    private String descripcion;
    private String token;
	private int numeroPaginas;
        
    public int getIdArchivoFrecuente() {
		return idArchivoFrecuente;
	}
	public void setIdArchivoFrecuente(int idArchivoFrecuente) {
		this.idArchivoFrecuente = idArchivoFrecuente;
	}
    
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}	
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public int getNumeroPaginas() {
		return numeroPaginas;
	}
	public void setNumeroPaginas(int numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}