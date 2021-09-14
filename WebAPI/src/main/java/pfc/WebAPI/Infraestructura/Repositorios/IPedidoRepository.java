package pfc.WebAPI.Infraestructura.Repositorios;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;

public interface IPedidoRepository extends JpaRepository<Pedido,Integer>{
	//public Pedido Save(Pedido pedido);
	public Optional<Pedido> findById(Integer idPedido);
	public List<Pedido> findAll();
	public List<Pedido> findByEstado(EstadoPedido estado);
}
