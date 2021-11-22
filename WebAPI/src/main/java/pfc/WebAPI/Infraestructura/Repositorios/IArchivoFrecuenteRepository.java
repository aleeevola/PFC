package pfc.WebAPI.Infraestructura.Repositorios;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;

public interface IArchivoFrecuenteRepository extends JpaRepository<ArchivoFrecuente,Integer>{
    public Page<ArchivoFrecuente> findByNombreContainingIgnoreCase(String nombre,Pageable pageable);
}
