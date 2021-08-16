package pfc.WebAPI.Infraestructura.Servicios;

import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;


public interface IPedidoService {
	public Optional<Pedido> obtenerPedido(int idPedido);
}
