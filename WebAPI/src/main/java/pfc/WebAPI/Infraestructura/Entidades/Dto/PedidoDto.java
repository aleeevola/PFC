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
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;

public class PedidoDto {
private  int idPedido;
    private int idUsuario;
    private Date fechaEstimadaEntrega;
    private int cantidadArchivos;
    
	public int getIdPedido() {
		return idPedido;
	}
	public void setIdPedido(int idPedido) {
		this.idPedido = idPedido;
	}
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
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
}
