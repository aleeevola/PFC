package pfc.WebAPI.Infraestructura.Servicios;

import com.mercadopago.exceptions.MPException;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;

public interface IPagosService {
	String getCodigoBotonDePago(int idPedido) throws MPException;

	int getIdPedidoByMercadoPagoId(String token, EstadoFrontMP estado);

	int putPagoEfectivo(int idPedido) ;
}
