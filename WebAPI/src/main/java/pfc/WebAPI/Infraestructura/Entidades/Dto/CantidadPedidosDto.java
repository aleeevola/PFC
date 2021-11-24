package pfc.WebAPI.Infraestructura.Entidades.Dto;

import java.util.Date;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;

public class CantidadPedidosDto {
	public int cantidadPedidos;
	public EstadoPedido estado;
	public int cantidadPaginas;
	public Date fecha;
	
	
	public int getCantidadPedidos() {
		return cantidadPedidos;
	}
	public void setCantidadPedidos(int cantidadPedidos) {
		this.cantidadPedidos = cantidadPedidos;
	}
	public EstadoPedido getEstado() {
		return estado;
	}
	public void setEstado(EstadoPedido estado) {
		this.estado = estado;
	}
	public int getCantidadPaginas() {
		return cantidadPaginas;
	}
	public void setCantidadPaginas(int cantidadPaginas) {
		this.cantidadPaginas = cantidadPaginas;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
