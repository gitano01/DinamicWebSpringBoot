package com.efevserv.implement;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import com.efevserv.model.request.ClienteRequest;
import com.efevserv.model.response.Cliente;
import com.efevserv.service.ClienteServiceDao;
import com.efevserv.jdbcConfig.JdbcConfig;

@Service
public class ClienteServiceImplement implements ClienteServiceDao{
	
	
	JdbcConfig jdbcConfig = new JdbcConfig();
	DataSource dataSourceConf = jdbcConfig.myPgSqlDataSource();
	JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSourceConf);	 
	 SimpleJdbcCall call;
	 
	public String addCliente(ClienteRequest cliente) {
		call = new SimpleJdbcCall(dataSourceConf).withFunctionName("addcustomer");
		  MapSqlParameterSource in = new MapSqlParameterSource();
		  in.addValue("fullname", cliente.getClienteNombre());
		  in.addValue("activo", cliente.getClienteActivo());
		  
		  String result = call.execute(in).toString();
		  
		  return result;
	}
	
	public String updateCliente(int id, ClienteRequest cliente){
		
		String  sql = "SELECT * FROM cliente where clienteid=" + id;
		 
	    List<Cliente>  list = this.jdbcTemplate.query(sql, new RowMapper<Cliente>() {
	        @Override
	        public Cliente mapRow(ResultSet rs, int i) throws SQLException {
	            Cliente cliente = new Cliente();
	            
	            cliente.setClienteId(rs.getInt("clienteid"));
	            cliente.setClienteNombre(rs.getString("clientenombre"));
	            cliente.setClienteFechaCreacion(rs.getString("clientefechacreacion"));
	            cliente.setClienteFechaModificacion(rs.getString("clientefechamodificacion"));
	            
	            return cliente;
	        }
	    });
	    
	    if(list.size()==0) {
	    	return "{returnvalue=0}";
	    }	
	else {
		SimpleJdbcCall call = new SimpleJdbcCall(dataSourceConf).withFunctionName("updateCustomer");
		 
		 MapSqlParameterSource in = new MapSqlParameterSource();
		 in.addValue("idCustomer",id);
		 in.addValue("fullname", cliente.getClienteNombre());
		 in.addValue("activo", cliente.getClienteActivo());
		  		
		 return call.execute(in).toString();
	}
	}
	
	public Cliente getClientePorId(int id) {
		String  sql = "SELECT * FROM cliente where clienteid=" + id;
		 
	    List<Cliente>  list = this.jdbcTemplate.query(sql, new RowMapper<Cliente>() {
	        @Override
	        public Cliente mapRow(ResultSet rs, int i) throws SQLException {
	            Cliente cliente = new Cliente();
	            
	            cliente.setClienteId(rs.getInt("clienteid"));
	            cliente.setClienteNombre(rs.getString("clientenombre"));
	            cliente.setClienteActivo(rs.getBoolean("clienteactivo"));
	            cliente.setClienteFechaCreacion(rs.getString("clientefechacreacion"));
	            cliente.setClienteFechaModificacion(rs.getString("clientefechamodificacion"));
	            
	            return cliente;
	        }
	    });
	    
	    if(list.size()>0) {
	    	Cliente cliente = new Cliente();
	    	for(Cliente elem: list) {
	    		
	    		cliente.setClienteId(elem.getClienteId());
	    		cliente.setClienteNombre(elem.getClienteNombre());
	    		cliente.setClienteActivo(elem.getClienteActivo());
	    		cliente.setClienteFechaCreacion(elem.getClienteFechaCreacion());
	    		cliente.setClienteFechaModificacion(elem.getClienteFechaModificacion());
	    		}
	    	
	    
	    	return cliente;
	    }	
	else {
		 call = new SimpleJdbcCall(dataSourceConf).withFunctionName("getcustomerbyid");
		 MapSqlParameterSource in = new MapSqlParameterSource();
		 in.addValue("identificador", id);
		 Map<String, Object> out = call.execute(in);
		
		 Cliente customer = new Cliente();
		 customer.setClienteId((int)out.get("clienteid"));
		 customer.setClienteActivo((boolean)out.get("clienteactivo"));
		 customer.setClienteNombre((String)out.get("clientenombre"));
		 customer.setClienteFechaCreacion(out.get("clientefechacreacion").toString());
		 customer.setClienteFechaModificacion(out.get("clientefechamodificacion").toString());
		 		 
		 return customer;	
	}
	}
	
	public List<Cliente> getClientes(){

		String sql = "SELECT * FROM cliente";

		List<Cliente> lista = new ArrayList<>();

		lista =  this.jdbcTemplate.query(sql, new RowMapper<Cliente>() {
		        @Override
		        public Cliente mapRow(ResultSet rs, int i) throws SQLException {
		         Cliente customer = new Cliente();
		   		 customer.setClienteId((int)rs.getInt("clienteid")); 
		   		 customer.setClienteActivo((boolean)rs.getBoolean("clienteactivo"));
		   		 customer.setClienteNombre((String)rs.getString("clientenombre"));
		   		 customer.setClienteFechaCreacion(rs.getString("clientefechacreacion").toString());
		   		 customer.setClienteFechaModificacion(rs.getString("clientefechamodificacion").toString());
		         return customer;
		        }
		    });

		return lista;
	 }
	
	public int deleteClientePorId(int id) {
		
		String  sql = "SELECT * FROM cliente where clienteid=" + id;
		 
	    List<Cliente>  list = this.jdbcTemplate.query(sql, new RowMapper<Cliente>() {
	        @Override
	        public Cliente mapRow(ResultSet rs, int i) throws SQLException {
	            Cliente cliente = new Cliente();
	            
	            cliente.setClienteId(rs.getInt("clienteid"));
	            cliente.setClienteNombre(rs.getString("clientenombre"));
	            cliente.setClienteFechaCreacion(rs.getString("clientefechacreacion"));
	            cliente.setClienteFechaModificacion(rs.getString("clientefechamodificacion"));
	            
	            return cliente;
	        }
	    });
	    
	    if(list.size()>0) {
	    	call = new SimpleJdbcCall(dataSourceConf).withFunctionName("suprcustomer");
			   SqlParameterSource in = new MapSqlParameterSource().addValue("idCustomer", id);		  
			   int resultado= call.executeFunction(Integer.class,in);
			  
			   return resultado;
	    }else {	
		   
		  
		   return 0;
		 }
	}

	

}
