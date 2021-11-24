package pfc.WebAPI.Servicios;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import pfc.WebAPI.Infraestructura.Servicios.IEmailService;


/**
 * 
 * @author Mukuljaiswal
 *
 */
@Service
public class EmailService implements IEmailService{

	/*
	 * The Spring Framework provides an easy abstraction for sending email by using
	 * the JavaMailSender interface, and Spring Boot provides auto-configuration for
	 * it as well as a starter module.
	 */
	
	private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}")
	private String emailEmpresa; 
	
	/**
	 * 
	 * @param javaMailSender
	 * @return 
	 */
	@Autowired
	public void MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}


	
	
	public void sendEmailNuevoPedido() throws MailException {

		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(emailEmpresa);
		mail.setSubject("Nuevo pedido recibido");
		mail.setText("Se recibió un nuevo pedido en la web.");

		javaMailSender.send(mail);
	}
	
	public void sendEmailImpreso(String email, int idPedido) throws MailException {

		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(email);
		mail.setSubject("Pedido impreso");
		mail.setText("El pedido #" + idPedido + " ha sido impreso y está listo para ser retirado.");

		javaMailSender.send(mail);
	}

	@Override
	public void sendEmailEntregado(String email, int idPedido) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(email);
		mail.setSubject("Pedido entregado");
		mail.setText("El pedido #" + idPedido + " fue entregado. ¡Gracias por elegirnos!");			

		javaMailSender.send(mail);		
	}
	
}