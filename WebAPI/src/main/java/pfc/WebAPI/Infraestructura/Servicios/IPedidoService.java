package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;
import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;


public interface IPedidoService {
	public Pedido nuevoPedido(Pedido pedido);
	public Optional<Pedido> obtenerPedido(int idPedido);
	public List<Pedido> findAll();
	public List<Pedido> obtenerPedidoByEstado(EstadoPedido estado);
}
