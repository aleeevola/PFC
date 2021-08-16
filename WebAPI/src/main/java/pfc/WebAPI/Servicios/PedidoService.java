package pfc.WebAPI.Servicios;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;


@Service
public class PedidoService implements IPedidoService{

	@Autowired
	private IPedidoRepository _pedidoRepository;
	
	@Override
	public Optional<Pedido> obtenerPedido(int idPedido) {
		
		return this._pedidoRepository.findById(idPedido);
		
	}

}
