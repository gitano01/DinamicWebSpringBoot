package com.efevserv.model.request;



public class ClienteRequest {
	
	private boolean clienteActivo;
	
	private String clienteNombre;
	
	public boolean getClienteActivo() {
		return clienteActivo;
	}
	
	public void setClienteActivo(boolean clienteactivo) {
		this.clienteActivo = clienteactivo;
	}
	public String getClienteNombre() {
		return clienteNombre;
	}
	public void setClienteNombre(String clientenombre) {
		this.clienteNombre = clientenombre;
	}
		
}
