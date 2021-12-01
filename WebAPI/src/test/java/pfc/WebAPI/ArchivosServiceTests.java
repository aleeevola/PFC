package pfc.WebAPI;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Servicios.IArchivosService;
import static org.junit.Assert.*;
import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = { "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect" })
@Sql("/test-h2.sql")
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class ArchivosServiceTests {
    @Autowired
    IArchivosService _archivosServices;

    float PRECIO_SIMPLE_A4_COLOR=25;

    @Test
    public void ObtenerNumeroDePaginas() throws IOException {
        Path resourceDirectory = Paths.get("src","test","resources","prueba.pdf");
        String absolutePath = resourceDirectory.toFile().getAbsolutePath();

        MultipartFile multipartFile = new MockMultipartFile("prueba.pdf","prueba.pdf","application/pdf", new FileInputStream(new File(absolutePath)));

        int numeroPaginas = _archivosServices.getNumeroPaginas(multipartFile);
        assertNotNull(multipartFile);
        assertEquals(2,numeroPaginas);
    }


    @Test
    public void ObtenerPrecioArchivo(){
        int numeroPaginas=3;
        float valorEsperado = PRECIO_SIMPLE_A4_COLOR*numeroPaginas;
        assertEquals(valorEsperado,_archivosServices.getPrecio(numeroPaginas, TipoImpresion.DOBLE, TamanioHoja.A4, Color.COLOR),0.001);

    }
}
