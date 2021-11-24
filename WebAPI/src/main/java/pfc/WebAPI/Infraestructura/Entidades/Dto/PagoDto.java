package pfc.WebAPI.Infraestructura.Entidades.Dto;


import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.MetodoDePago;

public class PagoDto {
	private int idPago;
	private MetodoDePago metodoDePago;
	private EstadoFrontMP estadoFront;
	
	
	public int getIdPago() {
		return idPago;
	}
	public void setIdPago(int idPago) {
		this.idPago = idPago;
	}
	public MetodoDePago getMetodoDePago() {
		return metodoDePago;
	}
	public void setMetodoDePago(MetodoDePago metodoDePago) {
		this.metodoDePago = metodoDePago;
	}
	public EstadoFrontMP getEstadoFront() {
		return estadoFront;
	}
	public void setEstadoFront(EstadoFrontMP estadoFront) {
		this.estadoFront = estadoFront;
	}
}
