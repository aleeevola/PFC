package pfc.WebAPI.Controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pfc.WebAPI.Entidades.Pedido;

@RestController
public class PedidosController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Pedido greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Pedido();
	}
}