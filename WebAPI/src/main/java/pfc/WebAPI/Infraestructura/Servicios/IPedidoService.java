package pfc.WebAPI.Infraestructura.Servicios;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestParam;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PedidoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;


public interface IPedidoService {
	public Pedido nuevoPedido();
	public Optional<Pedido> obtenerPedido(int idPedido);
	public List<Pedido> findAll();
	public List<Pedido> obtenerPedidoByEstado(EstadoPedido estado);
	public Pedido iniciarPedido(PedidoDto pedido);
	public Pedido updatePedido(Date fechaEntrega,String email,String nombre,int idPedido);
	public Pedido updateEstadoPedido(EstadoPedido estado, int idPedido, String email);
	public PedidoDto obtenerPedidoDto(int idPedido);
	public String getEstado(int idPedido);
}
