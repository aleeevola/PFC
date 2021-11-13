package pfc.WebAPI.Infraestructura.Repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pfc.WebAPI.Infraestructura.Entidades.Precio;

public interface IPrecioRepository extends JpaRepository<Precio,Integer>{
	public List<Precio> findAll();
}
