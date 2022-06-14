package com.efevserv.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import com.efevserv.model.response.Contacto;


public interface ExcelService {

	public List<Contacto> listarContactos();
	public ByteArrayInputStream export();
	public ByteArrayInputStream export(List<Contacto> contactos);
	
	 
	
}
