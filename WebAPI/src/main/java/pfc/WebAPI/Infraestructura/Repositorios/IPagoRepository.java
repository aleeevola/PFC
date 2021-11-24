package pfc.WebAPI.Infraestructura.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import pfc.WebAPI.Infraestructura.Entidades.Pago;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;

import java.util.Optional;

public interface IPagoRepository extends JpaRepository<Pago,Integer> {
    public Optional<Pago> findByToken(String idPedido);

	public Pago findByPedidoIdPedido(int idPedido);
}
