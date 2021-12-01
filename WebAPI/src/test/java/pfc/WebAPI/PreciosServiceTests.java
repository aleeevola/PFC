package pfc.WebAPI;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Precio;
import pfc.WebAPI.Infraestructura.Servicios.IPagosService;
import pfc.WebAPI.Infraestructura.Servicios.IPrecioService;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = { "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect" })
@Sql("/test-h2.sql")
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class PreciosServiceTests {

	@Autowired
	IPrecioService _precioService;

	@Test
	public void ObtenerTodosLosPrecios() {
		assertEquals(5,_precioService.findAll().size());
	}

	@Test
	public void ObtenerPrecio() {
		Precio precio = _precioService.getPrecio(Color.COLOR, TamanioHoja.A4, TipoImpresion.DOBLE);

		float valorEsperado = 21;
		assertNotNull(precio);
		assertEquals(valorEsperado,precio.getPrecio(),0.01);
	}

}
