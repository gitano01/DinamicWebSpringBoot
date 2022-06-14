package com.efevserv.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efevserv.implement.ConsignatarioServiceImplement;
import com.efevserv.model.request.ConsignatarioRequest;
import com.efevserv.model.response.Consignatario;
import com.efevserv.model.response.Resultado;
import com.efevserv.model.response.ErrorResponse;
import com.efevserv.model.response.Response;
import com.efevserv.util.Validations;



@CrossOrigin
@RestController
@RequestMapping("/consignatarios")
public class ConsignatarioController {

	Logger log = LoggerFactory.getLogger(ConsignatarioController.class);
	
	@Autowired
	ConsignatarioServiceImplement consignatarioService;

	Response res;
	
	Validations validar = new Validations();
	
		
	@CrossOrigin
	@PostMapping("/agregarConsignatario")
	public ResponseEntity<Response> addConsignatario(@Valid @RequestBody ConsignatarioRequest consignatario) throws Exception {
		String  insertado = "";
		
		
		try {
			
			if(validar.validaCadena(consignatario.getConsignatarioNombre()) == false) {
				res = new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no acepta numeros enteros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			if(consignatario.getConsignatarioNombre() == null || consignatario.getConsignatarioNombre() == "") {
				res = new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no debe ser nulo o vacío");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
		
			insertado = consignatarioService.addConsignatario(consignatario);
			
			if(insertado.equals("{returnvalue=1}")){
				res = new Resultado(200, "Operación exitosa", "Se ha registrado el consignatario con éxito");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res,HttpStatus.OK);
			}
			
		}catch(Exception ex) {
			

			res =  new ErrorResponse(500, "Error Interno del servidor", "https://efevser.com/BadRequest.500", ex.getMessage());
			System.out.println(res.trazaOperacion());
			return new ResponseEntity<Response>(res,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return null;
		
	}
	
	
	@PutMapping("/actualizarConsignatario/{id}")
	public ResponseEntity<Response> updateConsignatario(@PathVariable("id") String id,@Valid @RequestBody ConsignatarioRequest consignatario) throws Exception{
        
		try {	
		
            String  insertado = "";    
            
	  
			if(validar.validaNumero(id) == false) {
				
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El parametro id debe ser un entero");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
				
			}
			
			if(consignatario.getConsignatarioNombre() == null || consignatario.getConsignatarioNombre() == "") {
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no debe ser nulo o vacío");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			if(validar.validaCadena(consignatario.getConsignatarioNombre()) == false) {
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no acepta numeros enteros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
	  		
            insertado = consignatarioService.updateConsignatario(Integer.parseInt(id), consignatario);
            
            if(insertado.equals("{returnvalue=1}")) {
			
            	res =  new Resultado(200, "Operación exitosa", "La actualización ha sido correcta");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res,HttpStatus.OK);
                
            }else {
            	res =  new ErrorResponse(404, "Recurso no encontrado", "https://efevser.com/BadRequest.404", "No se encontraron registros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.NOT_FOUND);
            }
		}catch(Exception ex) {

			res =  new ErrorResponse(500, "Error Interno", "https://efevser.com/BadRequest.500", ex.getMessage());
			System.out.println(res.trazaOperacion());
			return new  ResponseEntity<Response>(res ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	  	
	}
	
	@CrossOrigin
	@GetMapping("/obtenerConsignatarios")
	public ResponseEntity<Response> getConsignatarios() throws Exception{
		
		
		List<Consignatario> listaConsignatario = new ArrayList<Consignatario>();
		
		try {
			
			listaConsignatario = consignatarioService.getConsignatarios();
			
			
			if(listaConsignatario.size()>0) {
				
				res =  new Resultado(200, "Operación exitosa", listaConsignatario);
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res,HttpStatus.OK);
				
			}else {
				res =  new ErrorResponse(404, "Recurso no encontrado", "https://efevser.com/BadRequest.404", "No se encontraron registros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.NOT_FOUND);
			}
			
		}catch(Exception ex) {
			
			res =  new ErrorResponse(500, "Error Interno", "https://efevser.com/BadRequest.500", ex.getMessage());
			System.out.println(res.trazaOperacion());
			return new  ResponseEntity<Response>(res ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@CrossOrigin
	@GetMapping("/getConsignatario/{id}")
	public ResponseEntity<Response> getConsignatarioPorId(@PathVariable("id") String id) throws Exception{
		
		
		Consignatario consignatario = new Consignatario();
		
		try {
			
			if(validar.validaNumero(id) == false) {
				
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El parametro id debe ser un entero");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
					
				}
			
			consignatario = consignatarioService.getConsignatarioResponse(Integer.parseInt(id));
			
			if(consignatario != null) {
				res =  new Resultado(200, "Operación exitosa", consignatario);
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res,HttpStatus.OK);
			}
			
			
		}catch(Exception ex) {
			
			res =  new ErrorResponse(404, "Error Interno", "https://efevser.com/BadRequest.404", "No existe el registro a consultar");
			System.out.println(res.trazaOperacion());
			return new  ResponseEntity<Response>(res ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return null;
		
	}
	
	@DeleteMapping("/eliminar/{id}")
	 public ResponseEntity<Response> delClientePorId(@PathVariable("id") String id) throws Exception{
	  
	  int consignatario = 0;
	  try {
	   
		  consignatario = consignatarioService.deleteConsignatario(Integer.parseInt(id));
	   
	   if(consignatario == 1) {
		   	res =  new Resultado(200, "Operación exitosa", "registro eliminado");
			System.out.println(res.trazaOperacion());
			return new ResponseEntity<Response>(res,HttpStatus.OK);
	   }else{
		   res =  new ErrorResponse(404, "Recurso no encontrado", "https://efevser.com/BadRequest.404", "No se encontraron registros");
			System.out.println(res.trazaOperacion());
			return new ResponseEntity<Response>(res, HttpStatus.NOT_FOUND);
	   }
	   
	  }catch(Exception ex) {
	   
		  res =  new ErrorResponse(500, "Error Interno", "https://efevser.com/BadRequest.500", ex.getMessage());
			System.out.println(res.trazaOperacion());
			return new  ResponseEntity<Response>(res ,HttpStatus.INTERNAL_SERVER_ERROR);
	  }
	}
	
}
