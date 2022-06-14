package com.efevserv.service;

import java.util.List;


import com.efevserv.model.request.ConsignatarioRequest;
import com.efevserv.model.response.Consignatario;

public interface ConsignatarioServiceDao {

	public String addConsignatario(ConsignatarioRequest consignatario);
	public Consignatario getConsignatarioResponse(int id);
	public List<Consignatario> getConsignatarios();
	public String updateConsignatario(int id, ConsignatarioRequest consignatario);
	
}
