package com.efevserv.model.response;

import java.sql.Timestamp;
import com.google.gson.Gson;

public class Resultado extends Response{
	Gson res = new Gson();

	private Object resultado;
	
	public Resultado( int codigo, String mensaje, Object resultado) {
		super(codigo,mensaje);
		this.resultado=resultado;
	}
	
	public Object getResultado() {
		return resultado;
	}
	public void setResultado(Object resultado) {
		this.resultado = resultado;
	}
	
	@Override
	public String trazaOperacion() {
		
		
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		return timeStamp.toString() + "  --------" + "trazaOperacion: [ " + "codigo: " + String.valueOf(codigo) + " mensaje: " + mensaje +
				" resultado: " + res.toJson(resultado) + " ]";
	}
	
}
