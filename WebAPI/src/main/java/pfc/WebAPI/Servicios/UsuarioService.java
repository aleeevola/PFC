package pfc.WebAPI.Servicios;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Entidades.Usuario;
import pfc.WebAPI.Infraestructura.Repositorios.IUsuarioRepository;
import pfc.WebAPI.Infraestructura.Servicios.IUsuarioService;


@Service
public class UsuarioService implements IUsuarioService{

	@Autowired
	private IUsuarioRepository _usuarioRepository;
	
	@Override
	public Optional<Usuario> obtenerUsuario(int idUsuario) {
		
		return _usuarioRepository.findById(idUsuario);
		
	}

	@Override
	public List<Usuario> findAll() {
		
		return _usuarioRepository.findAll();
	}

}
