package pfc.WebAPI.Repositorios;

import org.springframework.stereotype.Repository;

import pfc.WebAPI.Infraestructura.Entidades.Pedido;
import pfc.WebAPI.Infraestructura.Repositorios.IPedidoRepository;

//EN ESTA CLASE SE DEBE IMPLEMENTAR EL REPOSITORIO SI ES QUE NECESITAMOS UN METODO ESPECIAL PERO NO SE COMO CONFIGURARLO CON EL JPA
// QUE TA TE DA LOS METODOS EN LA INTERFAZ
//@Repository
public class PedidoRepository //implements IPedidoRepository {
{
	//@Override
	public Pedido obtenerPedido(int codigoPedido) {
		// TODO Auto-generated method stub
		return null;
	}

}
