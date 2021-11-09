package pfc.WebAPI.Infraestructura.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import pfc.WebAPI.Infraestructura.Entidades.ArchivoFrecuente;

public interface IArchivoFrecuenteRepository extends JpaRepository<ArchivoFrecuente,Integer>{

}
