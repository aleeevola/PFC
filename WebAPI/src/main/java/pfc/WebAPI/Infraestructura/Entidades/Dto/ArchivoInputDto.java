package pfc.WebAPI.Infraestructura.Entidades.Dto;

public class ArchivoInputDto {
	private int numeroPaginas;
    private float precio;
    private int tipoImpresion;
    private int tamanioHoja;
    
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
	public int getTipoImpresion() {
		return tipoImpresion;
	}
	public void setTipoImpresion(int tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}
	public int getTamanioHoja() {
		return tamanioHoja;
	}
	public void setTamanioHoja(int tamanioHoja) {
		this.tamanioHoja = tamanioHoja;
	}
}
