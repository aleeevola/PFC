package pfc.WebAPI;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = { "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect" })
@Sql("/test-h2.sql")
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class PedidoServiceTests {
    @Autowired
    IPedidoService _pedidoServices;


    @Test
    public void ObtenerPedido() {
        int idPedido=1;
        Pedido pedido = _pedidoServices.obtenerPedido(idPedido).get();
        assertNotNull(pedido);
        assertEquals(idPedido,pedido.getIdPedido());
    }

    @Test
    public void ObtenerEstadoPedido() {
        int idPedido=3;
        String estado = _pedidoServices.getEstado(idPedido);
        assertEquals(EstadoPedido.ENTREGADO.toString(),estado);
    }


}
