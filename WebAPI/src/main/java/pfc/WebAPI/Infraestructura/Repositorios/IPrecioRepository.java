package pfc.WebAPI.Infraestructura.Repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Precio;

public interface IPrecioRepository extends JpaRepository<Precio,Integer>{
	public List<Precio> findAll();
	public Optional<Precio> findFirstByColorAndTamanioHojaAndTipoImpresion(Color color, TamanioHoja tamanioDeHoja, TipoImpresion tipoDeImpresion);
}
