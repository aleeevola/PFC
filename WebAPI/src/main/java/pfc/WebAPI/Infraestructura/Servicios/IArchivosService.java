package pfc.WebAPI.Infraestructura.Servicios;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

public interface IArchivosService {
//	Archivo nuevoArchivo(int idPedido, MultipartFile archivo);
	Resource descargarArchivo(String token);
	
	int getNumeroPaginas(MultipartFile archivo) throws IOException;
	float getPrecio(int numeroPaginas, TipoImpresion formato, TamanioHoja tamanio);
	
	Archivo postArchivo(int idPedido, MultipartFile archivo, TipoImpresion formato, TamanioHoja tamanio) throws IOException;
}
