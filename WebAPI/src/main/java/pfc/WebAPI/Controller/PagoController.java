package pfc.WebAPI.Controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import pfc.WebAPI.Infraestructura.Entidades.Pago;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PagoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;
import pfc.WebAPI.Infraestructura.Servicios.IPagosService;

@Api(value="PagoRest",description="Permite gestionar pagos")
@RestController
@RequestMapping("/pago")
@CrossOrigin(origins = "*")
public class PagoController {

	@Autowired
	public IPagosService _pagosServices;
	
	@GetMapping("mercadoPago/{idPedido}")
	@ApiOperation(value = "Retorna la URL de pago de Mercado Pago")
	public ResponseEntity<String> getMercadoPagoId(@PathVariable("idPedido") int idPedido) {
		try {
			return ResponseEntity.ok(_pagosServices.getCodigoBotonDePago(idPedido));			
		}
		catch(MPConfException mce) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Configuracion MP: "+mce.getMessage());
		}
		catch(MPException me) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(me.getMessage());
		}
		catch(NoSuchElementException e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping("mercadoPago/callBackFront")
	@ApiOperation(value = "Actualiza el estado del pago por el resultado del front de Mercado Pago y retorna el id del Pedido")
	public ResponseEntity<String> getIdPedidoByMercadoPagoId(@RequestParam("token") String token,@RequestParam("estadoFront") int estadoFront) {
		try {
			return ResponseEntity.ok(String.valueOf(_pagosServices.getIdPedidoByMercadoPagoId(token, EstadoFrontMP.valueOf(estadoFront))));
		}
		catch(NoSuchElementException e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping("efectivo/{idPedido}")
	@ApiOperation(value = "Marca que el pedido se pagara en efectivo en el local")
	public ResponseEntity<String> putPagoEfectivo(@PathVariable("idPedido") int idPedido) {
		try {
			return ResponseEntity.ok(String.valueOf(_pagosServices.putPagoEfectivo(idPedido)));
		}
		catch(NoSuchElementException e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/{idPedido}")
	@ApiOperation(value = "Retorna el pago asociado al pedido")
	public PagoDto getPagoByIdPedido(@PathVariable("idPedido") int idPedido) {
		return this._pagosServices.getPagobyIdPedido(idPedido);
	}

	
}
