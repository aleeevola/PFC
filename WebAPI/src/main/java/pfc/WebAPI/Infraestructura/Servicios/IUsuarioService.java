package pfc.WebAPI.Infraestructura.Servicios;

import java.util.Optional;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;


public interface IUsuarioService {
	public Usuario obtenerUsuario(int idUsuario);
	public Usuario crearUsuario();
}
