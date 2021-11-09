package pfc.WebAPI.Infraestructura.Entidades;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

@Entity
public class DetalleArchivoFrecuente {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private int idDetalleArchivoFrecuente;
    @Enumerated(EnumType.STRING)
    private TipoImpresion tipoImpresion;
    @Enumerated(EnumType.STRING)
    private TamanioHoja tamanioHoja;
    @Enumerated(EnumType.STRING)
    private Color color;
    private String observaciones;
    
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "pedido_id_pedido")
    @JsonIgnoreProperties("archivosFrecuentes")
    private Pedido pedido;
    
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_archivo_frecuente")
    @JsonIgnoreProperties("archivoFrecuente")
    private ArchivoFrecuente archivoFrecuente;
    
    private float precio;

	public int getIdDetalleArchivoFrecuente() {
		return idDetalleArchivoFrecuente;
	}

	public void setIdDetalleArchivoFrecuente(int idDetalleArchivoFrecuente) {
		this.idDetalleArchivoFrecuente = idDetalleArchivoFrecuente;
	}

	public TipoImpresion getTipoImpresion() {
		return tipoImpresion;
	}

	public void setTipoImpresion(TipoImpresion tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}

	public TamanioHoja getTamanioHoja() {
		return tamanioHoja;
	}

	public void setTamanioHoja(TamanioHoja tamanioHoja) {
		this.tamanioHoja = tamanioHoja;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public ArchivoFrecuente getArchivoFrecuente() {
		return archivoFrecuente;
	}

	public void setArchivoFrecuente(ArchivoFrecuente archivoFrecuente) {
		this.archivoFrecuente = archivoFrecuente;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}        
    
}
