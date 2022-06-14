package com.efevserv.model.response;

public class Cliente {

	private int clienteId;
	private boolean clienteActivo;
	private String clienteNombre;
	private String clienteFechaCreacion;
	private String clienteFechaModificacion;
	
	public int getClienteId() {
		return clienteId;
	}
	public void setClienteId(int clienteId) {
		this.clienteId = clienteId;
	}
	public boolean getClienteActivo() {
		return clienteActivo;
	}
	public void setClienteActivo(boolean clienteActivo) {
		this.clienteActivo = clienteActivo;
	}
	public String getClienteNombre() {
		return clienteNombre;
	}
	public void setClienteNombre(String clienteNombre) {
		this.clienteNombre = clienteNombre;
	}
	public String getClienteFechaCreacion() {
		return clienteFechaCreacion;
	}
	public void setClienteFechaCreacion(String clienteFechaCreacion) {
		this.clienteFechaCreacion = clienteFechaCreacion;
	}
	public String getClienteFechaModificacion() {
		return clienteFechaModificacion;
	}
	public void setClienteFechaModificacion(String clienteFechaModificacion) {
		this.clienteFechaModificacion = clienteFechaModificacion;
	}
	
}
