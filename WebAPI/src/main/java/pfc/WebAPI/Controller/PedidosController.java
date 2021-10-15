package pfc.WebAPI.Controller;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PedidoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

@Api(value="PedidoRest",description="Permite gestionar los pedidos")
@RestController
@RequestMapping("/pedidos")
public class PedidosController {

	@Autowired
	private IPedidoService _pedidoService;

	@ApiOperation(value = "Obtener un pedido")
	@GetMapping("/{idPedido}")
	public Optional<Pedido> getPedido(@PathVariable("idPedido") int idPedido) {
		return this._pedidoService.obtenerPedido(idPedido);
	}
	@PostMapping
	@ResponseBody
	@ApiOperation(value = "Nuevo pedido")
	public ResponseEntity<Pedido> newPedido(@RequestBody PedidoDto pedido){
		return ResponseEntity.ok(this._pedidoService.nuevoPedido(pedido));
	}
	
	@PostMapping("/iniciar")
	@ResponseBody
	@ApiOperation(value = "Iniciar pedido")
	public ResponseEntity<Pedido> iniciarPedido(@RequestBody PedidoDto pedido){
		return ResponseEntity.ok(this._pedidoService.iniciarPedido(pedido));
	}
	
	@PatchMapping
	@ResponseBody
	@ApiOperation(value = "Actualizar pedido")
	public ResponseEntity<Pedido> updatePedido(@RequestBody PedidoDto pedido){
		return ResponseEntity.ok(this._pedidoService.nuevoPedido(pedido));
	}
	
	@GetMapping
	@ApiOperation(value = "Obtener todos los pedidos..")
	public List<Pedido> findAll() {
		return this._pedidoService.findAll();
	}
	@ApiOperation(value = "Obtener un pedido según estado")
	@GetMapping("/estado/{estado}")
	public List<Pedido> getPedidoByEstado(@PathVariable("estado") String estado) {
		return this._pedidoService.obtenerPedidoByEstado(EstadoPedido.valueOf(estado));
	}
	
}