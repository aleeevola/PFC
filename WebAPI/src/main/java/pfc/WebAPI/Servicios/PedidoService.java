package pfc.WebAPI.Servicios;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PedidoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;
import pfc.WebAPI.Infraestructura.Servicios.IUsuarioService;


@Service
public class PedidoService implements IPedidoService{

	@Autowired
	private IPedidoRepository _pedidoRepository;
	@Autowired
	private IUsuarioService _usuarioService;
	
	@Override
	public Optional<Pedido> obtenerPedido(int idPedido) {
		return this._pedidoRepository.findById(idPedido);
	}

	@Override
	public List<Pedido> findAll() {
		return _pedidoRepository.findAll();
	}

	@Override
	public Pedido nuevoPedido(PedidoDto pedido) {
		Pedido nuevoPedido= new Pedido();
		nuevoPedido.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
		nuevoPedido.setUsuario(this._usuarioService.obtenerUsuario(pedido.getIdUsuario()).get());
		nuevoPedido.setEstado(EstadoPedido.CREADO);
		return this._pedidoRepository.save(nuevoPedido);
	}
	
	@Override
	public Pedido iniciarPedido(PedidoDto pedido) {
		Pedido nuevoPedido= new Pedido();
		nuevoPedido.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
		nuevoPedido.setUsuario(this._usuarioService.obtenerUsuario(pedido.getIdUsuario()).get());
		nuevoPedido.setEstado(EstadoPedido.CREADO);
		return this._pedidoRepository.save(nuevoPedido);
	}

	@Override
	public List<Pedido> obtenerPedidoByEstado(EstadoPedido estado) {
		return this._pedidoRepository.findByEstado(estado);
	}

}
