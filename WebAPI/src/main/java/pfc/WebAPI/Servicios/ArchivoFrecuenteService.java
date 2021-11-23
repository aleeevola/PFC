package pfc.WebAPI.Servicios;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Repositorios.IArchivoFrecuenteRepository;
import pfc.WebAPI.Infraestructura.Repositorios.IDetalleArchivoFrecuenteRepository;
import pfc.WebAPI.Infraestructura.Servicios.IArchivoFrecuenteService;
import pfc.WebAPI.Infraestructura.Servicios.IArchivosService;
import pfc.WebAPI.Infraestructura.Servicios.IFileStorageService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

@Service
public class ArchivoFrecuenteService implements IArchivoFrecuenteService{

	@Autowired
	private IArchivoFrecuenteRepository _archivoFrecuenteRepository;
	@Autowired
	private IDetalleArchivoFrecuenteRepository _detalleArchivoFrecuenteRepository;
	
	@Autowired
	private IFileStorageService _ftpService;

	@Autowired
	private IPedidoService _pedidoService;

	@Autowired
	private IArchivosService _archivosService;
	
	@Override
	public Optional<ArchivoFrecuente> obtenerArchivoFrecuente(int idArchivoFrecuente) {
		return this._archivoFrecuenteRepository.findById(idArchivoFrecuente);
	}

	@Override
	public ArchivoFrecuente nuevoArchivoFrecuente(String nombre) {
		ArchivoFrecuente nuevoArchivoFrecuente = new ArchivoFrecuente();
		nuevoArchivoFrecuente.setNombre(nombre);
		return this._archivoFrecuenteRepository.save(nuevoArchivoFrecuente);
	}

	@Override
	public ArchivoFrecuente postArchivoFrecuente(MultipartFile archivo) throws IOException {
		ArchivoFrecuente archivoFrecuente = new ArchivoFrecuente();
		archivoFrecuente.setNombre(StringUtils.cleanPath(archivo.getOriginalFilename()));
		
		ArchivoFrecuente saveArchivo = this._archivoFrecuenteRepository.save(archivoFrecuente);
		
		String token = this._ftpService.guardarArchivo(saveArchivo.getIdArchivoFrecuente(), archivo);
		saveArchivo.setToken(token);
		this._archivoFrecuenteRepository.saveAndFlush(saveArchivo);
		
		return saveArchivo;
	}

	@Override
	public List<ArchivoFrecuente> findAll() {		
		return this._archivoFrecuenteRepository.findAll();
	}

	@Override
	public Page<ArchivoFrecuente> findAllByNombre(String nombre, int page, int pageSize) {
		Pageable pageResult = PageRequest.of(page-1, pageSize, Sort.by("nombre"));
		return _archivoFrecuenteRepository.findByNombreContainingIgnoreCase(nombre,pageResult);
	}

	@Override
	public DetalleArchivoFrecuente agregarAPedido(int idPedido, int idArchivoFrecuente, TipoImpresion formato, TamanioHoja tamanio, Color color, String observaciones) throws IOException {
		Pedido pedido;
		if(idPedido==0) {
			//TODO: Cambiar por el usaurio
			pedido = this._pedidoService.nuevoPedido();
		}
		else{
			pedido = _pedidoService.obtenerPedido(idPedido).get();
		}

		ArchivoFrecuente archivoFrecuente = this._archivoFrecuenteRepository.findById(idArchivoFrecuente).get();

		DetalleArchivoFrecuente nuevoArchivo = new DetalleArchivoFrecuente();
		nuevoArchivo.setPedido(pedido);
		nuevoArchivo.setArchivoFrecuente(archivoFrecuente);
		nuevoArchivo.setPrecio(this._archivosService.getPrecio(archivoFrecuente.getNumeroPaginas(), formato, tamanio, color));
		nuevoArchivo.setTamanioHoja(tamanio);
		nuevoArchivo.setTipoImpresion(formato);
		nuevoArchivo.setColor(color);
		nuevoArchivo.setObservaciones(observaciones);

		DetalleArchivoFrecuente saveArchivo = this._detalleArchivoFrecuenteRepository.save(nuevoArchivo);

		return saveArchivo;
	}

	@Override
	public void deleteArchivoFrecuente(int idArchivoFrecuente) {
		this._archivoFrecuenteRepository.deleteById(idArchivoFrecuente);		
	}

}
