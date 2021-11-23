package pfc.WebAPI.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Precio;
import pfc.WebAPI.Infraestructura.Repositorios.IPrecioRepository;
import pfc.WebAPI.Infraestructura.Servicios.IPrecioService;

@Service
public class PrecioService implements IPrecioService{

	@Autowired
	private IPrecioRepository _precioRepository;

	@Override
	public List<Precio> findAll() {		
		return this._precioRepository.findAll();
	}

	@Override
	public Precio updatePrecio(int idPrecio, float precio) {	
		Precio p = this._precioRepository.findById(idPrecio).get();
		p.setPrecio(precio);
		
		return this._precioRepository.save(p);
	}

	@Override
	public Precio getPrecio(Color color, TamanioHoja tamanioDeHoja, TipoImpresion tipoDeImpresion) {
		return this._precioRepository.findFirstByColorAndTamanioHojaAndTipoImpresion(color,tamanioDeHoja,tipoDeImpresion).get();
	}

}
