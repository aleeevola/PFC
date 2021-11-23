package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Precio;

public interface IPrecioService {

	List<Precio> findAll();

	Precio updatePrecio(int idPrecio, float precio);

	Precio getPrecio(Color color, TamanioHoja tamanioDeHoja, TipoImpresion tipoDeImpresion);
}
