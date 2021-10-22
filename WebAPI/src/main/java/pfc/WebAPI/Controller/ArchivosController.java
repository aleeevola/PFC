package pfc.WebAPI.Controller;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Servicios.IArchivosService;

@Api(value="PedidosRest",description="Permite gestionar los archivos")
@RestController
@RequestMapping("/archivos")
@CrossOrigin(origins = "*")
public class ArchivosController {

	@Autowired
	private IArchivosService _archivosService;
	
	@PostMapping("/numeroDePaginas")
	@ResponseBody
	@ApiOperation(value = "Calcular numero de paginas de un archivo")
	public ResponseEntity<Integer> detalleArchivo(@RequestParam("file") MultipartFile file) throws IOException{
		int count = this._archivosService.getNumeroPaginas(file);
		return ResponseEntity.ok(count);
	}
	
	@GetMapping("/precio")
	@ResponseBody
	@ApiOperation(value = "Calcula el precio de un archivo")
	public ResponseEntity<String> getPrecio(
			@RequestParam("numeroPaginas") int numeroPaginas,
			@RequestParam("formato") int formato,
			@RequestParam("tamanio") int tamanio) throws IOException{
		
		float count = this._archivosService.getPrecio(numeroPaginas, TipoImpresion.valueOf(formato), TamanioHoja.valueOf(tamanio));
		
		return ResponseEntity.ok(Float.toString(count));
	}
	
	
	@PostMapping("/nuevo")
	@ResponseBody
	@ApiOperation(value = "nuevo")
	public ResponseEntity<Archivo> nuevoArchivo(
			@RequestParam("file") MultipartFile file,
			@RequestParam("formato") int formato,
			@RequestParam("tamanio") int tamanio,
			@RequestParam("idPedido") int idPedido) throws Exception{
		
		try {
			Archivo archivoResult = this._archivosService.postArchivo(idPedido,file, TipoImpresion.valueOf(formato), TamanioHoja.valueOf(tamanio));
			return ResponseEntity.ok(archivoResult);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new Exception(e.getCause());
		}
	}
	
	@GetMapping("/descargar/{token}")
	@ApiOperation(value = "Descargar archivo")
	public ResponseEntity<Resource> descargarArchivo(@PathVariable("token") String token, HttpServletRequest request){
		Resource resource = this._archivosService.descargarArchivo(token);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
//         .info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
        
//		return ResponseEntity.ok(this._archivosService.descargarArchivo(token));
	}
}