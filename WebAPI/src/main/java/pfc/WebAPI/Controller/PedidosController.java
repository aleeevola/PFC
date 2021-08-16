package pfc.WebAPI.Controller;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

@RestController
@RequestMapping("/pedido")
public class PedidosController {

	@Autowired
	private IPedidoService _pedidoService;

	@GetMapping("/{idPedido}")
	public Optional<Pedido> getPedido(@PathVariable("idPedido") int idPedido) {
		
		return this._pedidoService.obtenerPedido(idPedido);
	}
	
	
}