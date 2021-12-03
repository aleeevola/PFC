package pfc.WebAPI.Infraestructura.Entidades;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPago;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.MetodoDePago;

@Entity
public class Pago {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idPago;
	
	private String token;
	private float total;
	
	@Enumerated(EnumType.STRING)
	private MetodoDePago metodoDePago;
	@Enumerated(EnumType.STRING)
	private EstadoPago estado;

	@JsonIgnore
	@OneToOne
	private Pedido pedido;

	@Enumerated(EnumType.STRING)
	private EstadoFrontMP estadoFront;

	public EstadoFrontMP getEstadoFront() {
		return estadoFront;
	}
	public void setEstadoFront(EstadoFrontMP estadoFront) {
		this.estadoFront = estadoFront;
	}
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}
	public int getIdPago() {
		return idPago;
	}
	public void setIdPago(int idPago) {
		this.idPago = idPago;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public MetodoDePago getMetodoDePago() {
		return metodoDePago;
	}
	public void setMetodoDePago(MetodoDePago metodoDePago) {
		this.metodoDePago = metodoDePago;
	}
	public EstadoPago getEstado() {
		return estado;
	}
	public void setEstado(EstadoPago estado) {
		this.estado = estado;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}		
	
}
