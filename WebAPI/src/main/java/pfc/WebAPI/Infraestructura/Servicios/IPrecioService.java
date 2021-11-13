package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;

import pfc.WebAPI.Infraestructura.Entidades.Precio;

public interface IPrecioService {

	List<Precio> findAll();

	Precio updatePrecio(int idPrecio, float precio);

}
