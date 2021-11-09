package pfc.WebAPI.Infraestructura.Servicios;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;

public interface IArchivoFrecuenteService {
	public Optional<ArchivoFrecuente> obtenerArchivoFrecuente(int idArchivoFrecuente);

	public ArchivoFrecuente nuevoArchivoFrecuente(String nombre);

	public ArchivoFrecuente postArchivoFrecuente(MultipartFile file) throws IOException;

	public List<ArchivoFrecuente> findAll();
}
