package pfc.WebAPI.Infraestructura.Repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;

@Repository
public interface IArchivoRepository extends JpaRepository<Archivo,Integer>{
	public Optional<Archivo> findById(Integer idArchivo);
}
