package pfc.WebAPI.Infraestructura.Servicios;

import org.springframework.mail.MailException;

public interface IEmailService {
	public void sendEmailImpreso(String email, int idPedido);
	public void sendEmailEntregado(String email, int idPedido);
	public void sendEmailNuevoPedido();
	
}
