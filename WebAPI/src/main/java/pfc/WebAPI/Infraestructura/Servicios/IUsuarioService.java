package pfc.WebAPI.Infraestructura.Servicios;

import java.util.List;
import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Usuario;


public interface IUsuarioService {
	public Optional<Usuario> obtenerUsuario(int idUsuario);
	public Optional<Usuario> obtenerUsuarioByEmail(String email);
	public Usuario crearUsuarioByEmailNombre(String email,String nombre);
	public Usuario updateUsuario(Usuario usuario);
	public List<Usuario> findAll();
}
