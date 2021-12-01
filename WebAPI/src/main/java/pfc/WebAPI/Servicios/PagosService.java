package pfc.WebAPI.Servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoFrontMP;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPago;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Entidades.Pago;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PagoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.MetodoDePago;
import pfc.WebAPI.Infraestructura.Repositorios.IPagoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IEmailService;
import pfc.WebAPI.Infraestructura.Servicios.IPagosService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;


@Service
public class PagosService implements  IPagosService{

	@Autowired
	private IPedidoService _pedidoService;
	@Autowired
	private IPagoRepository _pagoRepository;
	@Autowired 
	private IEmailService _emailService;

	
	@Override
	public String getCodigoBotonDePago(int idPedido) throws MPException {
				
		Pedido pedido = this._pedidoService.obtenerPedido(idPedido).get();
		
		Pago pago;
		if(pedido.getPago()!= null) {
			pago = pedido.getPago();
		}
		else {
			pago = new Pago();
			pago.setMetodoDePago(MetodoDePago.MERCADO_PAGO);
			//pedido.setPago(pago)
			pago.setPedido(pedido);
		}
		pago.setMetodoDePago(MetodoDePago.MERCADO_PAGO);
		pago.setEstado(EstadoPago.PENDIENTE);

		float total = 0;
		for(Archivo archivo :pedido.getArchivos()){
			if(archivo.getPrecio()==0){
				//TODO:SETEAR PARCIAL?
			}
			total=archivo.getPrecio()+total;
		};
		for(DetalleArchivoFrecuente archivoF :pedido.getDetalleArchivosFrecuentes()){
			total=archivoF.getPrecio()+total;
		};
		if(total==0){
			pago.setTotal(1);
		}
		else {
			pago.setTotal(total);
		}

		//ARMO EL ITEM DE MERCADO PAGO
		Preference preference = new Preference();

		Item item = new Item();
		item.setTitle("Mi producto")
			.setId(String.valueOf(pedido.getIdPedido()))
		    .setQuantity(1)
		    .setUnitPrice((float) pago.getTotal());
		preference.appendItem(item);

		
		BackUrls backUrls = new BackUrls(
                "http://localhost:3000/pedido/result/exito",
                "http://localhost:3000/pedido/result/pendiente",
                "http://localhost:3000/pedido/result/error");

		preference.setBackUrls(backUrls);
		
		
		preference.save();
		pago.setToken(preference.getId());
		this._pagoRepository.saveAndFlush(pago);
		return preference.getInitPoint();
		//return preference.getId();
	}

	@Override
	public int getIdPedidoByMercadoPagoId(String token, EstadoFrontMP estado) {
		Pago pago = this._pagoRepository.findByToken(token).get();
		pago.setEstadoFront(estado);
		//TODO: SETEO EL ESTADO EN PENDIENTE CON ESTE CALLBACK O CON EL DE BACKEND?
		pago.getPedido().setEstado(EstadoPedido.PENDIENTE);
		this._pagoRepository.saveAndFlush(pago);
		this._emailService.sendEmailNuevoPedido();
		return pago.getPedido().getIdPedido();
		//return 0;
	}

	@Override
	public int putPagoEfectivo(int idPedido) {
		Pedido pedido = this._pedidoService.obtenerPedido(idPedido).get();
		Pago pago= new Pago();

		pago.setMetodoDePago(MetodoDePago.EFECTIVO);
		pago.setEstado(EstadoPago.PENDIENTE);

		//TODO: Calcular el total que va a pagar
		float total = 0;
		for(Archivo archivo :pedido.getArchivos()){
			if(archivo.getPrecio()==0){
				//TODO:SETEAR PARCIAL?
			}
			total=archivo.getPrecio()+total;
		};
		for(DetalleArchivoFrecuente archivoF :pedido.getDetalleArchivosFrecuentes()){
			total=archivoF.getPrecio()+total;
		};
		pago.setTotal(total);
		pedido.setEstado(EstadoPedido.PENDIENTE);
		pago.setPedido(pedido);

		this._pagoRepository.saveAndFlush(pago);
		this._emailService.sendEmailNuevoPedido();

		return pedido.getIdPedido();
	}

	@Override
	public PagoDto getPagobyIdPedido(int idPedido) {
		Pago p = this._pagoRepository.findByPedidoIdPedido(idPedido);
		PagoDto pagoDto = new PagoDto();
		pagoDto.setIdPago(p.getIdPago());
		pagoDto.setMetodoDePago(p.getMetodoDePago());
		pagoDto.setEstadoFront(p.getEstadoFront());
		
		return pagoDto;
	}

}
