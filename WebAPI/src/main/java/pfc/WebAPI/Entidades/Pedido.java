package com.example.restservice;
import java.sql.Date;
import java.util.ArrayList; 

public class Pedido {

	private final int idPedido;
    private final int idCliente;
	private final Date fechaIngreso;
    private final Date fechaEstimadaEntrega;
    private final Date fechaEntrega;
    private final char estado;
    private final Boolean pagado;
    private final int idPago;

    private ArrayList<Archivo> Archivos;



}