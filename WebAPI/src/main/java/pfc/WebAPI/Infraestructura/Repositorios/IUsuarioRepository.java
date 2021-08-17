package pfc.WebAPI.Infraestructura.Repositorios;
import org.springframework.data.jpa.repository.JpaRepository;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;

public interface IUsuarioRepository extends JpaRepository<Usuario,Integer>{
	Usuario findById(Integer idUsuario);
}
