package com.efevserv.model.response;

import java.sql.Timestamp;

public class Response {

	protected int codigo;
	protected String mensaje;
	
	public Response(int codigo , String mensaje) {
		
		this.codigo=codigo;
		this.mensaje= mensaje;
	}
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
   
	public String trazaOperacion() {
		
		
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		return timeStamp.toString() + "  --------" + "trazaOperacion: [ " + "codigo: " + String.valueOf(codigo) + " mensaje: " + mensaje+" ]";
	}
}
