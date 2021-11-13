package pfc.WebAPI.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Precio;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Servicios.IPrecioService;

@Api(value="PrecioRest",description="Permite gestionar los precios")
@RestController
@RequestMapping("/precios")
@CrossOrigin(origins = "*")
public class PreciosController {

	@Autowired
	private IPrecioService _precioService;
	
	@GetMapping
	@ApiOperation(value = "Obtener todos los precios")
	public List<Precio> findAll() {
		return this._precioService.findAll();
	}
	
	@PatchMapping("/actualizar")
	@ResponseBody
	@ApiOperation(value = "Actualizar estado del precio")
	public ResponseEntity<Precio> updatePrecio(
			@RequestParam("idPrecio") int idPrecio,
			@RequestParam("precio") float precio){		
		
		return ResponseEntity.ok(this._precioService.updatePrecio(idPrecio, precio));
	}
	
}
