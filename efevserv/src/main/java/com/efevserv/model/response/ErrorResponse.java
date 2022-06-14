package com.efevserv.model.response;

import java.sql.Timestamp;


public class ErrorResponse extends Response{
	
	
	private String info;
	private String detalles;
	
	public ErrorResponse(int codigo, String mensaje, String info, String detalles) {
		super(codigo,mensaje);
		this.info= info;
		this.detalles=detalles;
		
	}	
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getDetalles() {
		return detalles;
	}
	public void setDetalles(String detalles) {
		this.detalles = detalles;
	}
	
	@Override
	public String trazaOperacion() {
		
		
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		return timeStamp.toString() + "  --------" + "traza Operación: [ " + "codigo: " + String.valueOf(codigo) + ", mensaje: " + mensaje +
				", info: " + info + ", detalles:"+ detalles + " ]";
	}
}
