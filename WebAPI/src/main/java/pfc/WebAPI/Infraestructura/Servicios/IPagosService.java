package pfc.WebAPI.Infraestructura.Servicios;

import org.springframework.http.ResponseEntity;

import com.mercadopago.exceptions.MPException;

import pfc.WebAPI.Infraestructura.Entidades.Pago;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PagoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;

public interface IPagosService {
	String getCodigoBotonDePago(int idPedido) throws MPException;

	int getIdPedidoByMercadoPagoId(String token, EstadoFrontMP estado);

	int putPagoEfectivo(int idPedido) ;

	PagoDto getPagobyIdPedido(int idPedido);
}
