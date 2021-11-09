package pfc.WebAPI.Infraestructura.Servicios;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

public interface IArchivosService {
//	Archivo nuevoArchivo(int idPedido, MultipartFile archivo);
	Resource descargarArchivo(String token);
	
	int getNumeroPaginas(MultipartFile archivo) throws IOException;
	float getPrecio(int numeroPaginas, TipoImpresion formato, TamanioHoja tamanio, Color color);
	
	Archivo postArchivo(int idPedido, MultipartFile archivo, TipoImpresion formato, TamanioHoja tamanio, Color color,String observaciones) throws IOException;
}
