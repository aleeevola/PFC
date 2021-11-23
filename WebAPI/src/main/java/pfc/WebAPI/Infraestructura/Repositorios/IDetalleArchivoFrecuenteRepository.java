package pfc.WebAPI.Infraestructura.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;

public interface IDetalleArchivoFrecuenteRepository extends JpaRepository<DetalleArchivoFrecuente,Integer>{
}
