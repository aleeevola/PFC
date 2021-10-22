package pfc.WebAPI.Infraestructura.Entidades.Dto;

import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;

public class ArchivoOutputDto {
	private int idArchivo;
    private String nombre;
    private String token;
    private int numeroPaginas;
    private float precio;
    private TipoImpresion tipoImpresion;
	private TamanioHoja tamanioHoja;
    private String downloadLink;
    
    public ArchivoOutputDto(int idArchivo, String nombre, String token, int numeroPaginas, float precio,
			TipoImpresion tipoImpresion, TamanioHoja tamanioHoja, String downloadLink) {
		super();
		this.idArchivo = idArchivo;
		this.nombre = nombre;
		this.token = token;
		this.numeroPaginas = numeroPaginas;
		this.precio = precio;
		this.tipoImpresion = tipoImpresion;
		this.tamanioHoja = tamanioHoja;
		this.downloadLink = downloadLink;
	}

	public int getIdArchivo() {
		return idArchivo;
	}

	public void setIdArchivo(int idArchivo) {
		this.idArchivo = idArchivo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getNumeroPaginas() {
		return numeroPaginas;
	}

	public void setNumeroPaginas(int numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
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

	public String getDownloadLink() {
		return downloadLink;
	}

	public void setDownloadLink(String downloadLink) {
		this.downloadLink = downloadLink;
	}
    
    
}
