package pfc.WebAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPConfException;

import pfc.WebAPI.Infraestructura.Properties.FileStorageProperties;


@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class WebApiApplication {

	public static void main(String[] args) throws MPConfException {
		SpringApplication.run(WebApiApplication.class, args);
		MercadoPago.SDK.setAccessToken("TEST-1676497447630348-103000-47a7663114b389bcc3d0ad07ff93a0fc-204640350");
	}

}
