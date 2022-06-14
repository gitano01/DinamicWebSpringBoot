package com.efevserv.service;

import java.util.List;

import com.efevserv.model.request.ClienteRequest;
import com.efevserv.model.response.Cliente;

public interface ClienteServiceDao {

	public String addCliente(ClienteRequest cliente); 
	public Cliente getClientePorId(int id);
	public List<Cliente> getClientes();
	public String updateCliente(int id, ClienteRequest cliente);
	
}
