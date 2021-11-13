package pfc.WebAPI.Infraestructura.Entidades;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

@Entity
public class Precio {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int idPrecio;
	public float precio;
	@Enumerated(EnumType.STRING)
	public Color color;
	@Enumerated(EnumType.STRING)
	public TamanioHoja tamanioHoja;
	@Enumerated(EnumType.STRING)
	public TipoImpresion tipoImpresion;
	
	
	
	public int getIdPrecio() {
		return idPrecio;
	}
	public void setIdPrecio(int idPrecio) {
		this.idPrecio = idPrecio;
	}
	public float getPrecio() {
		return precio;
	}
	public void setPrecio(float precio) {
		this.precio = precio;
	}
	public Color getColor() {
		return color;
	}
	public void setColor(Color color) {
		this.color = color;
	}
	public TamanioHoja getTamanioHoja() {
		return tamanioHoja;
	}
	public void setTamanioHoja(TamanioHoja tamanioHoja) {
		this.tamanioHoja = tamanioHoja;
	}
	public TipoImpresion getTipoImpresion() {
		return tipoImpresion;
	}
	public void setTipoImpresion(TipoImpresion tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}
	
	
}
