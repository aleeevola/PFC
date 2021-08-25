package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;
import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Usuario;


public interface IUsuarioService {
	public Optional<Usuario> obtenerUsuario(int idUsuario);
	// public Usuario crearUsuario();
	public List<Usuario> findAll();
}
