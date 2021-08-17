package pfc.WebAPI.Servicios;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;
import pfc.WebAPI.Infraestructura.Servicios.IPedidoService;


@Service
public class UsuarioService implements IUsuarioService{

	@Autowired
	private IUsuarioRepository _usuarioRepository;
	
	@Override
	public Usuario obtenerUsuario(int idUsuario) {
		
		return this._usuarioRepository.findById(idUsuario);
		
	}

}
