package pfc.WebAPI.Infraestructura.Entidades;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

@Entity
public class Archivo {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private int idArchivo;
    private String nombre;
    private String token;
    private int numeroPaginas;
    @Enumerated(EnumType.STRING)
    private TipoImpresion tipoImpresion;
    @Enumerated(EnumType.STRING)
    private TamanioHoja tamanioHoja;
    @Enumerated(EnumType.STRING)
    private Color color;
    private String observaciones;
    @JsonIgnore 
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "pedido_id_pedido")
    @JsonIgnoreProperties("archivos")
    private Pedido pedido;

    
	private Date fechaIngreso;
    private Date fechaBaja;
    
    private float precio;
    
    
    
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
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
	public int getNumeroPaginas() {
		return numeroPaginas;
	}
	public void setNumeroPaginas(int numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}
	public TipoImpresion getTipoImpresion() {
		return tipoImpresion;
	}
	public void setTipoImpresion(TipoImpresion tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}
	public TamanioHoja getTamanioHoja() {
		return tamanioHoja;
	}
	public void setTamanioHoja(TamanioHoja tamanioHoja) {
		this.tamanioHoja = tamanioHoja;
	}
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
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
	public float getPrecio() {
		return precio;
	}
	public void setPrecio(float precio) {
		this.precio = precio;
	}
    
	public Color getColor() {
		return color;
	}
	public void setColor(Color color) {
		this.color = color;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

}