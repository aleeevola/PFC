package pfc.WebAPI.Servicios;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Repositorios.IArchivoFrecuenteRepository;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IArchivoFrecuenteService;
import pfc.WebAPI.Infraestructura.Servicios.IFileStorageService;

@Service
public class ArchivoFrecuenteService implements IArchivoFrecuenteService{

	@Autowired
	private IArchivoFrecuenteRepository _archivoFrecuenteRepository;
	
	@Autowired
	private IFileStorageService _ftpService;
	
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

}
