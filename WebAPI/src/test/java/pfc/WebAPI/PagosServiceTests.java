package pfc.WebAPI;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.MetodoDePago;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Servicios.IPagosService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = { "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect" })
@Sql("/test-h2.sql")
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class PagosServiceTests {
    @Autowired
    IPagosService pagosService;
    @Autowired
    IPedidoService _pedidosService;

    @Test
    public void ObtenerLinkDePago() throws MPException {
        MercadoPago.SDK.setAccessToken("TEST-1676497447630348-103000-47a7663114b389bcc3d0ad07ff93a0fc-204640350");

        int idPedido=2;
        String url = pagosService.getCodigoBotonDePago(idPedido);
        Pedido pedido = _pedidosService.obtenerPedido(idPedido).get();

        assertNotEquals("",url);
        assertEquals(idPedido,pedido.getIdPedido());
        //assertNotNull(pedido.getPago());
        //assertEquals(MetodoDePago.MERCADO_PAGO,pedido.getPago().getMetodoDePago());
    }


}
