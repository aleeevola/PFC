package pfc.WebAPI.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PedidoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Servicios.IArchivoFrecuenteService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

@Api(value="PedidoRest",description="Permite gestionar los archivos frecuentes")
@RestController
@RequestMapping("/archivosFrecuentes")
@CrossOrigin(origins = "*")
public class ArchivosFrecuentesController {

	@Autowired
	private IArchivoFrecuenteService _archivoFrecuenteService;

	@GetMapping
	@ApiOperation(value = "Obtener lista de archivos frecuentes")
	public List<ArchivoFrecuente> findAll() {
		return this._archivoFrecuenteService.findAll();
	}

	@GetMapping("/porNombrePaginado")
	@ApiOperation(value = "Obtener lista de archivos frecuentes por nombre pagindo")
	public Page<ArchivoFrecuente> findAllByNombre(@RequestParam(value = "nombre",required = false) String nombre, @RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
		if(nombre==null)
			nombre="";
		return this._archivoFrecuenteService.findAllByNombre(nombre,page,pageSize);
	}
	
	@ApiOperation(value = "Obtener un archivo frecuente")
	@GetMapping("/{idArchivoFrecuente}")
	public Optional<ArchivoFrecuente> getArchivoFrecuente(@PathVariable("idArchivoFrecuente") int idArchivoFrecuente) {
		return this._archivoFrecuenteService.obtenerArchivoFrecuente(idArchivoFrecuente);
	}
	
	@PostMapping("/nuevo")
	@ResponseBody
	@ApiOperation(value = "Nuevo archivo frecuente")
	public ResponseEntity<ArchivoFrecuente> subirArchivoFrecuente(
			@RequestParam("idArchivoFrecuente") int idArchivoFrecuente,
			@RequestParam("file") MultipartFile file,
			@RequestParam("descripcion") String descripcion
			) throws Exception{
		try {
			ArchivoFrecuente archivoFrecuenteResult = this._archivoFrecuenteService.postArchivoFrecuente(file);
			return ResponseEntity.ok(archivoFrecuenteResult);
		} catch (IOException e) {
			throw new Exception(e.getCause());
		}
	}
	
	
	@PostMapping("/nuevoDetalle")
	@ResponseBody
	@ApiOperation(value = "nuevo")
	public ResponseEntity<DetalleArchivoFrecuente> nuevoDetalleArchivoFrecuente(
			@RequestParam("idArchivoFrecuente") int idArchivoFrecuente,
			@RequestParam("formato") int formato,
			@RequestParam("tamanio") int tamanio,
			@RequestParam("idPedido") int idPedido,
			@RequestParam("color") int color,
			@RequestParam("observaciones") String observaciones) throws Exception{
					
//		try {
//			Archivo archivoResult = this._archivosService.postArchivo(idPedido,file, TipoImpresion.valueOf(formato), TamanioHoja.valueOf(tamanio),Color.valueOf(color),observaciones);
//			return ResponseEntity.ok(archivoResult);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			throw new Exception(e.getCause());
//		}
		return null;
	}
	
	
	
}



