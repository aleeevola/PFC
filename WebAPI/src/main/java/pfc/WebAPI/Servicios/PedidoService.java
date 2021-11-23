package pfc.WebAPI.Servicios;
import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Dto.PedidoDto;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.EstadoPedido;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IEmailService;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;
import pfc.WebAPI.Infraestructura.Servicios.IUsuarioService;


@Service
public class PedidoService implements IPedidoService{

	@Autowired
	private IPedidoRepository _pedidoRepository;
	@Autowired
	private IUsuarioService _usuarioService;	
	@Autowired 
	private IEmailService _emailService;
	
	@Override
	public Optional<Pedido> obtenerPedido(int idPedido) {
		return this._pedidoRepository.findById(idPedido);
	}
	
	@Override
	public PedidoDto obtenerPedidoDto(int idPedido) {
		Pedido pedido = this._pedidoRepository.findById(idPedido).get();		
		PedidoDto pedidoResult = new PedidoDto();
		pedidoResult.setIdPedido(pedido.getIdPedido());
		pedidoResult.setEstado(pedido.getEstado());
		//pedidoResult.setPago(pedido.getPago().getEstado());
		pedidoResult.setFechaEstimadaEntrega(pedido.getFechaEstimadaEntrega());
		pedidoResult.setUsuario(pedido.getUsuario());
		pedidoResult.setCantidadArchivos(pedido.getCantidadArchivos());
		pedidoResult.setArchivos(pedido.getArchivos());
		
		for(DetalleArchivoFrecuente detalleAF : pedido.getDetalleArchivosFrecuentes()) {
			Archivo a = new Archivo();
			a.setIdArchivo(detalleAF.getIdDetalleArchivoFrecuente());
			a.setNombre(detalleAF.getArchivoFrecuente().getNombre());
			a.setColor(detalleAF.getColor());
			a.setObservaciones(detalleAF.getObservaciones());
			a.setTamanioHoja(detalleAF.getTamanioHoja());
			a.setTipoImpresion(detalleAF.getTipoImpresion());
			a.setToken(detalleAF.getArchivoFrecuente().getToken());		
			
			pedidoResult.getArchivos().add(a);
		}
		
		return pedidoResult;		
		
	}

	@Override
	public String getEstado(int idPedido) {
		return this._pedidoRepository.findById(idPedido).get().getEstado().toString();
	}

	@Override
	public List<Pedido> findAll() {
		return _pedidoRepository.findAll();
	}

	@Override
	public Pedido nuevoPedido() {
		Pedido nuevoPedido= new Pedido();
		nuevoPedido.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
//		nuevoPedido.setUsuario(this._usuarioService.obtenerUsuario(idUsuario).get());
		nuevoPedido.setEstado(EstadoPedido.CREADO);
		return this._pedidoRepository.save(nuevoPedido);
	}
	
	@Override
	public Pedido iniciarPedido(PedidoDto pedido) {
		Pedido nuevoPedido= new Pedido();
		nuevoPedido.setFechaIngreso(new java.sql.Date(System.currentTimeMillis()));
		nuevoPedido.setUsuario(this._usuarioService.obtenerUsuario(pedido.getUsuario().getIdUsuario()).get());
		nuevoPedido.setEstado(EstadoPedido.CREADO);
		return this._pedidoRepository.save(nuevoPedido);
	}

	@Override
	public List<Pedido> obtenerPedidoByEstado(EstadoPedido estado) {
		return this._pedidoRepository.findByEstado(estado);
	}

	@Override
	public Pedido updatePedido(java.sql.Date fechaEntrega, String email, String nombre, int idPedido) {
		Pedido pedido = this._pedidoRepository.findById(idPedido).get();
		
		Usuario usuario;
		try {
			usuario = this._usuarioService.obtenerUsuarioByEmail(email).get();
			usuario.setNombre(nombre);
			usuario = this._usuarioService.updateUsuario(usuario);
			
		}catch(NoSuchElementException e) {
			usuario = this._usuarioService.crearUsuarioByEmailNombre(email, nombre);
		}
		
		pedido.setUsuario(usuario);
		pedido.setFechaEstimadaEntrega(fechaEntrega);
		
		return this._pedidoRepository.saveAndFlush(pedido);
	}

	@Override
	public Pedido updateEstadoPedido(EstadoPedido estado, int idPedido, String email) {
		Pedido pedido = this._pedidoRepository.findById(idPedido).get();
		pedido.setEstado(estado);	
		if(estado == EstadoPedido.IMPRESO) {
			
			this._emailService.sendEmail(email);
		}else {
			if(estado == EstadoPedido.ENTREGADO) {
				pedido.setFechaEntrega(new Date(System.currentTimeMillis()));
				
			}
		}
		return this._pedidoRepository.saveAndFlush(pedido);
	} 

}
