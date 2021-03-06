package pfc.WebAPI.Infraestructura.Entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.FetchMode;
import org.hibernate.annotations.Fetch;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;


@Entity
public class Pedido {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private  int idPedido;
	
	@ManyToOne()
    private  Usuario usuario;
    
	private  Date fechaIngreso;
    private  Date fechaEstimadaEntrega;
    private  Date fechaEntrega;
    private  Date fechaImpresion;
    
    @Enumerated(EnumType.STRING)
    private  EstadoPedido estado;
    
    @OneToOne()
    private  Pago pago;
    
    @JsonIgnore 
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("pedido")
    private List<Archivo> Archivos;
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("pedido")
    private Set<DetalleArchivoFrecuente> DetalleArchivosFrecuentes;
 
    private int cantidadArchivos;
    
    
	public int getIdPedido() {
		return idPedido;
	}

	public void setIdPedido(int idPedido) {
		this.idPedido = idPedido;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Date getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(Date fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	public Date getFechaEstimadaEntrega() {
		return fechaEstimadaEntrega;
	}

	public void setFechaEstimadaEntrega(Date fechaEstimadaEntrega) {
		this.fechaEstimadaEntrega = fechaEstimadaEntrega;
	}

	public Date getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(Date fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	public EstadoPedido getEstado() {
		return estado;
	}

	public void setEstado(EstadoPedido estado) {
		this.estado = estado;
	}

	public Pago getPago() {
		return pago;
	}

	public void setPago(Pago pago) {
		this.pago = pago;
	}

	public List<Archivo> getArchivos() {
		return Archivos;
	}

	public void setArchivos(List<Archivo> archivos) {
		Archivos = archivos;
	}


	public int getCantidadArchivos() {
		return cantidadArchivos;
	}

	public void setCantidadArchivos(int cantidadArchivos) {
		this.cantidadArchivos = cantidadArchivos;
	}

	public Set<DetalleArchivoFrecuente> getDetalleArchivosFrecuentes() {
		return DetalleArchivosFrecuentes;
	}

	public void setDetalleArchivosFrecuentes(Set<DetalleArchivoFrecuente> archivosFrecuentes) {
		DetalleArchivosFrecuentes = archivosFrecuentes;
	}

	public Date getFechaImpresion() {
		return fechaImpresion;
	}

	public void setFechaImpresion(Date fechaImpresion) {
		this.fechaImpresion = fechaImpresion;
	}	
	

}