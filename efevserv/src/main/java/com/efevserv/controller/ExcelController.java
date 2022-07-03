package com.efevserv.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efevserv.model.response.Contacto;
import com.efevserv.service.ExcelService;

@CrossOrigin
@RestController
@RequestMapping("/gestion-excel")
public class ExcelController {
	
	@Autowired
	ExcelService xlService;
	
	
	@GetMapping("/decargarExcel")
	public void downloadExcelFile(HttpServletResponse response) throws IOException {
		//HttpServletResponse response = null;
		System.out.println("Hola tengo tu arcivo excel, mejora tu codigo para obtenerlo");
		ByteArrayInputStream byteArrayInputStream = xlService.export();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=contactos.xlsx");
        IOUtils.copy(byteArrayInputStream, response.getOutputStream());
	}
	
	@PostMapping("/decargarExcelJson")
	public HttpServletResponse  downloadExcelJsonFile( HttpServletResponse response ,List<Contacto> contactos) throws IOException {
		
		System.out.println("Hola tengo tu arcivo excel, mejora tu codigo para obtenerlo");
		ByteArrayInputStream byteArrayInputStream = xlService.export(contactos);
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=contactosJsonFile.xlsx");
        IOUtils.copy(byteArrayInputStream, response.getOutputStream());
        return response;
        
	}
	
	@GetMapping("/listarContactos")
	public List<Contacto> listarContactos() throws IOException {
		
        return xlService.listarContactos();
	}
	
}
