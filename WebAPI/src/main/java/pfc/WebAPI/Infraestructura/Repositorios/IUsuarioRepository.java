package pfc.WebAPI.Infraestructura.Repositorios;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pfc.WebAPI.Infraestructura.Entidades.Usuario;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario,Integer>{
	public Optional<Usuario> findById(Integer idUsuario);
	public Optional<Usuario> findByEmail(String email);
	public List<Usuario> findAll();
}