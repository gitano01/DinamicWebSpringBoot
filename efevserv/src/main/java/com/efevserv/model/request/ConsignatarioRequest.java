package com.efevserv.model.request;



public class ConsignatarioRequest {
	
	private int clienteId;
	
	private boolean consignatarioActivo;
	
	private String  consignatarioNombre;
	
	
	public int getClienteId() {
		return clienteId;
	}
	public void setClienteId(int clienteId) {
		this.clienteId = clienteId;
	}
	public boolean getConsignatarioActivo() {
		return consignatarioActivo;
	}
	public void setConsignatarioActivo(boolean consignatarioActivo) {
		this.consignatarioActivo = consignatarioActivo;
	}
	public String getConsignatarioNombre() {
		return consignatarioNombre;
	}
	public void setConsignatarioNombre(String consignatarioNombre) {
		this.consignatarioNombre = consignatarioNombre;
	}
}
