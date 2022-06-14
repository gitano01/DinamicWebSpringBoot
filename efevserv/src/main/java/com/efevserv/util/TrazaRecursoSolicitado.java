package com.efevserv.util;

import java.sql.Timestamp;

public class TrazaRecursoSolicitado {

	private String urlTarget;

	private String adreesGuest;

	private Object insumo;
	
	public TrazaRecursoSolicitado (String urlTarget,String adreesGuest,Object insumo) {
		
		this.urlTarget = urlTarget; this.adreesGuest = adreesGuest; this.insumo = insumo;
	}
	
public String getUrlTarget() {
		return urlTarget;
	}


	public void setUrlTarget(String urlTarget) {
		this.urlTarget = urlTarget;
	}


	public String getAdreesGuest() {
		return adreesGuest;
	}


	public void setAdreesGuest(String adreesGuest) {
		this.adreesGuest = adreesGuest;
	}


	public Object getInsumo() {
		return insumo;
	}


	public void setInsumo(Object insumo) {
		this.insumo = insumo;
	}


public String TrazaPeticion(String urlTarget,String adreesGuest,Object insumo) {
		
		
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		return ""+ timeStamp.toString() + "  --------" + "traza solicitud: [ " + "urlDestino: " + urlTarget + ", consumidor: " + adreesGuest +
				", insumo: " + insumo + " ]";
	}
}
