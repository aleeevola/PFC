package pfc.WebAPI.Infraestructura.Servicios;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {
	String guardarArchivo(int idArchivo, MultipartFile file);
	Resource descargarArchivo(String tokenFile);
}
