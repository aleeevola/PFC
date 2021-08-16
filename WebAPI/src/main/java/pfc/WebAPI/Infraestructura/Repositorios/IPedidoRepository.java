package pfc.WebAPI.Infraestructura.Repositorios;
import org.springframework.data.jpa.repository.JpaRepository;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;

public interface IPedidoRepository extends JpaRepository<Pedido,Integer>{
	
}
