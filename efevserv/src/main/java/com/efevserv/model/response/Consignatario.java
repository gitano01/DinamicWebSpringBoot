package com.efevserv.model.response;

public class Consignatario {

	private int clienteId;
	private int	consignatarioId;
	private boolean consignatarioActivo;
	private String  consignatarioNombre;
	private String consignatarioFechaCreacion;
	private String consignatarioFechaModificacion;
	
	public int getClienteId() {
		return clienteId;
	}
	public void setClienteId(int clienteId) {
		this.clienteId = clienteId;
	}
	public int getConsignatarioId() {
		return consignatarioId;
	}
	public void setConsignatarioId(int consignatarioId) {
		this.consignatarioId = consignatarioId;
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
	public String getConsignatarioFechaCreacion() {
		return consignatarioFechaCreacion;
	}
	public void setConsignatarioFechaCreacion(String consignatarioFechaCreacion) {
		this.consignatarioFechaCreacion = consignatarioFechaCreacion;
	}
	public String getConsignatarioFechaModificacion() {
		return consignatarioFechaModificacion;
	}
	public void setConsignatarioFechaModificacion(String consignatarioFechaModificacion) {
		this.consignatarioFechaModificacion = consignatarioFechaModificacion;
	}	
	
	
}
