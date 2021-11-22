package pfc.WebAPI.Infraestructura.Entidades.Dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.Color;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TamanioHoja;
import pfc.WebAPI.Infraestructura.Entidades.Enumerables.TipoImpresion;
import pfc.WebAPI.Infraestructura.Entidades.Pedido;

import javax.persistence.*;
import java.sql.Date;

public class ArchivoTablaDto {
    private int idArchivo;
    private String nombre;
    private TipoImpresion tipoImpresion;
    private TamanioHoja tamanioHoja;
    private Color color;
    private int idPedido;
    private float precio;

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

    public int getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }
}
