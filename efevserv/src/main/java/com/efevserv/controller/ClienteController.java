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
import com.efevserv.implement.ClienteServiceImplement;
import com.efevserv.model.request.ClienteRequest;
import com.efevserv.model.response.Cliente;
import com.efevserv.model.response.Response;
import com.efevserv.model.response.ErrorResponse;
import com.efevserv.model.response.Resultado;
import com.efevserv.util.Validations;


@CrossOrigin
@RestController
@RequestMapping({"/clientes"})
public class ClienteController {

	Logger log = LoggerFactory.getLogger(ClienteController.class);
	
	@Autowired
	ClienteServiceImplement clienteService;
	
	Validations validar = new Validations();
	
	
	Response res;
	 
	
   
	
	@PostMapping("/agregarCliente")
	public ResponseEntity<Response> addCliente(@RequestBody ClienteRequest cliente) throws Exception {
		String  insertado = null;
		
		try {
			
			if(validar.validaCadena(cliente.getClienteNombre()) == false) {
								
				res = new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no acepta numeros enteros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			if(cliente.getClienteNombre() == null || cliente.getClienteNombre() == "") {
				
				res = new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no debe ser nulo o vacío");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}			
			
			
			insertado = clienteService.addCliente(cliente);
			
			if(insertado.equals("{returnvalue=1}")){
			
				res = new Resultado(200, "Operación exitosa", "Se ha registrado el cliente con éxito");
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
	
	
	@PutMapping("/actualizarCliente/{id}")
	public ResponseEntity<Response> updateCliente(@PathVariable("id") String id, @Valid @RequestBody ClienteRequest cliente) throws Exception{
		
		String update = "";
		try {
			
			if(validar.validaNumero(id) == false) {
				
				
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El parametro id debe ser un entero");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
					
				}
			if(cliente.getClienteNombre() == null || cliente.getClienteNombre() == "") {
			
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no debe ser nulo o vacío");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			if(validar.validaCadena(cliente.getClienteNombre()) == false) {
				
				res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El campo nombre no acepta numeros enteros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			
			
			update  = clienteService.updateCliente(Integer.valueOf(id), cliente);
		
			if(update.equals("{returnvalue=1}")) {
				
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
	
	
	@GetMapping("/obtenerCliente/{id}")
	public ResponseEntity<?> getClientePorId(@PathVariable("id") String id) throws Exception{
		
		Cliente cliente = new Cliente();
		try {
			
				if(validar.validaNumero(id) == false) {
				
					res =  new ErrorResponse(400, "Error en la petición", "https://efevser.com/BadRequest.400", "El parametro id debe ser un entero");
					System.out.println(res.trazaOperacion());
					return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
					
				}
			
			cliente = clienteService.getClientePorId(Integer.parseInt(id));
			
			if(cliente != null) {
				
				res =  new Resultado(200, "Operación exitosa", cliente);
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res,HttpStatus.OK);
			}else{
				res =  new ErrorResponse(404, "Recurso no encontrado", "https://efevser.com/BadRequest.404", "No se encontraron registros");
				System.out.println(res.trazaOperacion());
				return new ResponseEntity<Response>(res, HttpStatus.NOT_FOUND);
			}
			
		}catch(Exception ex) {
			
			res =  new ErrorResponse(404, "Error Interno", "https://efevser.com/BadRequest.404", "No existe el registro a consultar");
			System.out.println(res.trazaOperacion());
			return new  ResponseEntity<Response>(res ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@GetMapping("/obtenerClientes")
	public ResponseEntity<?> getClientes() throws Exception{
		
		List<Cliente> lista = new ArrayList<Cliente>();
		try {
			
			lista = clienteService.getClientes();
			
			if(lista!=null) {
				
				res =  new Resultado(200, "Operación exitosa", lista);
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
	
	
	@DeleteMapping("/eliminar/{id}")
	 public ResponseEntity<?> delClientePorId(@PathVariable("id") String id) throws Exception{
	  
	  int cliente = 0;
	  try {
	   
	   cliente = clienteService.deleteClientePorId(Integer.parseInt(id));
	   
	   if(cliente == 1) {
	   
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
