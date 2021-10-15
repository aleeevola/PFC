package pfc.WebAPI.Servicios;
import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Repositorios.IArchivoRepository;
import pfc.WebAPI.Infraestructura.Repositorios.IUsuarioRepository;
import pfc.WebAPI.Infraestructura.Servicios.IArchivosService;
import pfc.WebAPI.Infraestructura.Servicios.IFileStorageService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

@Service
public class ArchivosService implements IArchivosService{

	@Autowired
	private IPedidoService _pedidoService;
	@Autowired
	private IArchivoRepository _archivosRepository;
	@Autowired
	private IFileStorageService _ftpService;
	
	@Override
	public Archivo nuevoArchivo(int idPedido, MultipartFile archivo) {
		Archivo nuevoArchivo = new Archivo();
		nuevoArchivo.setPedido(_pedidoService.obtenerPedido(idPedido).get());
		nuevoArchivo.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
		nuevoArchivo.setNombre(StringUtils.cleanPath(archivo.getOriginalFilename()));
		nuevoArchivo.setTamanioHoja(TamanioHoja.A4);
		nuevoArchivo.setTipoImpresion(TipoImpresion.DOBLE);
		Archivo saveArchivo = this._archivosRepository.save(nuevoArchivo);
		
		String token = this._ftpService.guardarArchivo(saveArchivo.getIdArchivo(), archivo);
		
		nuevoArchivo.setToken(token);
		this._archivosRepository.saveAndFlush(nuevoArchivo);
		
		return saveArchivo;
	}

	@Override
	public Resource descargarArchivo(String token) {
		return this._ftpService.descargarArchivo(token);
	}

	@Override
	public int getNumeroPaginas(MultipartFile archivo) throws IOException {
		PDDocument doc = Loader.loadPDF(archivo.getBytes());
		return doc.getNumberOfPages();
	}

	@Override
	public float getPrecio(int numeroPaginas, TipoImpresion formato, TamanioHoja tamanio) {
		// TODO Calcular precio
		return 99;
	}

	@Override
	public Archivo postArchivo(MultipartFile archivo, TipoImpresion formato, TamanioHoja tamanio) throws IOException {
		Archivo nuevoArchivo = new Archivo();
		nuevoArchivo.setNumeroPaginas(this.getNumeroPaginas(archivo));
		nuevoArchivo.setPrecio(this.getPrecio(nuevoArchivo.getNumeroPaginas(), formato, tamanio));
		nuevoArchivo.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
		nuevoArchivo.setNombre(StringUtils.cleanPath(archivo.getOriginalFilename()));
		nuevoArchivo.setTamanioHoja(tamanio);
		nuevoArchivo.setTipoImpresion(formato);
		
		Archivo saveArchivo = this._archivosRepository.save(nuevoArchivo);
		
		String token = this._ftpService.guardarArchivo(saveArchivo.getIdArchivo(), archivo);
		
		saveArchivo.setToken(token);
		this._archivosRepository.saveAndFlush(saveArchivo);
		
		return saveArchivo;
	}

}
