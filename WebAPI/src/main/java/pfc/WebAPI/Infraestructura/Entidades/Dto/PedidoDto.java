package pfc.WebAPI.Infraestructura.Entidades.Dto;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Pago;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPago;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;

public class PedidoDto {
	private  int idPedido;
    private Usuario usuario;
    private EstadoPedido estado;
    private EstadoPago pago;
    private Date fechaEstimadaEntrega;
    private int cantidadArchivos;
    private List<Archivo> archivos;
    
    
    
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
	public EstadoPedido getEstado() {
		return estado;
	}
	public void setEstado(EstadoPedido estado) {
		this.estado = estado;
	}
	public EstadoPago getPago() {
		return pago;
	}
	public void setPago(EstadoPago pago) {
		this.pago = pago;
	}
	public Date getFechaEstimadaEntrega() {
		return fechaEstimadaEntrega;
	}
	public void setFechaEstimadaEntrega(Date fechaEstimadaEntrega) {
		this.fechaEstimadaEntrega = fechaEstimadaEntrega;
	}
	public int getCantidadArchivos() {
		return cantidadArchivos;
	}
	public void setCantidadArchivos(int cantidadArchivos) {
		this.cantidadArchivos = cantidadArchivos;
	}
	public List<Archivo> getArchivos() {
		return archivos;
	}
	public void setArchivos(List<Archivo> archivos) {
		this.archivos = archivos;
	}
    
    
}