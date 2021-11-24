package pfc.WebAPI.Servicios;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Archivo;
import pfc.WebAPI.Infraestructura.Entidades.DetalleArchivoFrecuente;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Entidades.Dto.CantidadPedidosDto;
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
		switch(estado){
		case IMPRESO:
			pedido.setFechaImpresion(new Date(System.currentTimeMillis()));
			this._emailService.sendEmailImpreso(email, idPedido);
			break;
		case ENTREGADO:
			pedido.setFechaEntrega(new Date(System.currentTimeMillis()));
			this._emailService.sendEmailEntregado(email, idPedido);
			break;
		default:
			break;
		}

		return this._pedidoRepository.saveAndFlush(pedido);
	}

	@Override
	public List<CantidadPedidosDto> getCantidadPedidosPorEstado() {
		List<CantidadPedidosDto> lista = new ArrayList<CantidadPedidosDto>();
		
	    Calendar calendar = Calendar.getInstance();
	    calendar.set(Calendar.HOUR_OF_DAY, 0);
	    calendar.set(Calendar.MINUTE, 0);
	    calendar.set(Calendar.SECOND, 0);
	    calendar.set(Calendar.MILLISECOND, 0);
		java.util.Date hoyU = calendar.getTime();
		
		CantidadPedidosDto pendientes = new CantidadPedidosDto();
		pendientes.setEstado(EstadoPedido.PENDIENTE);
		pendientes.setCantidadPedidos(0);
				for(Pedido p : this._pedidoRepository.findByEstado(EstadoPedido.PENDIENTE)) {
					pendientes.setCantidadPedidos(pendientes.getCantidadPedidos() + 1);
					for(Archivo a : p.getArchivos()) {
						pendientes.setCantidadPaginas(pendientes.getCantidadPaginas() + a.getNumeroPaginas());
					}
					for(DetalleArchivoFrecuente af : p.getDetalleArchivosFrecuentes()) {
						pendientes.setCantidadPaginas(pendientes.getCantidadPaginas() + af.getArchivoFrecuente().getNumeroPaginas());
					}					
				}
				
				CantidadPedidosDto impresos = new CantidadPedidosDto();
				impresos.setEstado(EstadoPedido.IMPRESO);
				impresos.setCantidadPedidos(0);
				for(Pedido p : this._pedidoRepository.findByEstadoAndFechaImpresion(EstadoPedido.IMPRESO, hoyU)) {
					impresos.setCantidadPedidos(impresos.getCantidadPedidos() + 1);
					for(Archivo a : p.getArchivos()) {
						impresos.setCantidadPaginas(impresos.getCantidadPaginas() + a.getNumeroPaginas());
					}
					for(DetalleArchivoFrecuente af : p.getDetalleArchivosFrecuentes()) {
						impresos.setCantidadPaginas(impresos.getCantidadPaginas() + af.getArchivoFrecuente().getNumeroPaginas());
					}					
				}
				
				

		CantidadPedidosDto entregados = new CantidadPedidosDto();
		entregados.setEstado(EstadoPedido.ENTREGADO);
		entregados.setCantidadPedidos(0);

		for(Pedido p : this._pedidoRepository.findByEstadoAndFechaEntrega(EstadoPedido.ENTREGADO, hoyU)) {
			entregados.setCantidadPedidos(entregados.getCantidadPedidos() + 1);
			for(Archivo a : p.getArchivos()) {
				entregados.setCantidadPaginas(entregados.getCantidadPaginas() + a.getNumeroPaginas());
			}
			for(DetalleArchivoFrecuente af : p.getDetalleArchivosFrecuentes()) {
				entregados.setCantidadPaginas(entregados.getCantidadPaginas() + af.getArchivoFrecuente().getNumeroPaginas());
			}					
		}
		
		lista.add(pendientes);
		lista.add(impresos);		
		lista.add(entregados);
		return lista;
	} 

}
