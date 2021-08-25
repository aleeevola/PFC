package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;
import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;


public interface IPedidoService {
	public Optional<Pedido> obtenerPedido(int idPedido);
	public List<Pedido> findAll();
}
