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
import com.efevserv.jdbcConfig.JdbcConfig;
import com.efevserv.model.request.ConsignatarioRequest;
import com.efevserv.model.response.Cliente;
import com.efevserv.model.response.Consignatario;
import com.efevserv.service.ConsignatarioServiceDao;




@Service
public class ConsignatarioServiceImplement implements ConsignatarioServiceDao{

	
	
	
	JdbcConfig jdbcConfig = new JdbcConfig();
	DataSource dataSourceConf = jdbcConfig.myPgSqlDataSource();
	JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSourceConf);	 
	 SimpleJdbcCall call;
	
	 
	 public String addConsignatario(ConsignatarioRequest consignatario) {
			call = new SimpleJdbcCall(dataSourceConf).withFunctionName("addconsignee");
			  MapSqlParameterSource in = new MapSqlParameterSource();
			  in.addValue("idCliente", consignatario.getClienteId());
			  in.addValue("fullname", consignatario.getConsignatarioNombre());
			  in.addValue("activo", consignatario.getConsignatarioActivo());
			  
			  String result = call.execute(in).toString();
			  
			  return result;
		}
	 
	 public String updateConsignatario(int id, ConsignatarioRequest consignatario){
			
		    String  sql = "SELECT * FROM consignatario where consignatarioid=" + id;
		 
		    List<Consignatario>  list = this.jdbcTemplate.query(sql, new RowMapper<Consignatario>() {
		        @Override
		        public Consignatario mapRow(ResultSet rs, int i) throws SQLException {
		            Consignatario consignatario = new Consignatario();
		            
		            consignatario.setConsignatarioActivo(rs.getBoolean("consignatarioactivo"));
		            consignatario.setConsignatarioNombre(rs.getString("consignatarionombre"));
		            consignatario.setConsignatarioId(rs.getInt("consignatarioid"));
		            consignatario.setConsignatarioFechaCreacion(rs.getString("consignatariofechacreacion"));
		            consignatario.setConsignatarioFechaModificacion(rs.getString("consignatariofechamodificacion"));
		            return consignatario;
		        }
		    });
		    
		    if(list.size()==0) {
		    	return "{returnvalue=0}";
		    }else {
		    
			SimpleJdbcCall call = new SimpleJdbcCall(dataSourceConf).withFunctionName("updateConsignee");
			 
			 MapSqlParameterSource in = new MapSqlParameterSource();
			 in.addValue("idCustomer",consignatario.getClienteId());
			 in.addValue("fullname", consignatario.getConsignatarioNombre());
			 in.addValue("activo", consignatario.getConsignatarioActivo());
			 in.addValue("idConsignee", id);
			  		
			 return call.execute(in).toString();
		    }
		}
		  
	 
	 
	public Consignatario getConsignatarioResponse(int id) {
		String  sql = "SELECT * FROM consignatario where consignatarioid=" + id;
		 
	    List<Consignatario>  list = this.jdbcTemplate.query(sql, new RowMapper<Consignatario>() {
	        @Override
	        public Consignatario mapRow(ResultSet rs, int i) throws SQLException {
	            Consignatario consignatario = new Consignatario();
	            
	            consignatario.setConsignatarioActivo(rs.getBoolean("consignatarioactivo"));
	            consignatario.setConsignatarioNombre(rs.getString("consignatarionombre"));
	            consignatario.setConsignatarioId(rs.getInt("consignatarioid"));
	            consignatario.setClienteId(rs.getInt("clienteid"));
	            consignatario.setConsignatarioFechaCreacion(rs.getString("consignatariofechacreacion"));
	            consignatario.setConsignatarioFechaModificacion(rs.getString("consignatariofechamodificacion"));
	            return consignatario;
	        }
	    });
	    
	    if(list.size() > 0) {
	    	
	    	Consignatario consignatario = new Consignatario();
	    	for(Consignatario elem: list) {
	    		consignatario.setClienteId(elem.getClienteId());
	    		consignatario.setConsignatarioFechaCreacion(elem.getConsignatarioFechaCreacion());
	    		consignatario.setConsignatarioActivo(elem.getConsignatarioActivo());
	    		consignatario.setConsignatarioFechaModificacion(elem.getConsignatarioFechaModificacion());
	    		consignatario.setConsignatarioNombre(elem.getConsignatarioNombre());
	    		consignatario.setConsignatarioId(elem.getConsignatarioId());
	    	}
	    	
	    	return consignatario;
	    }else {
		 call = new SimpleJdbcCall(dataSourceConf).withFunctionName("getconsigneebyid");
		 MapSqlParameterSource in = new MapSqlParameterSource();
		 in.addValue("identificador", id);
		 Map<String, Object> out = call.execute(in);
		 Consignatario consignee = new Consignatario();
		 consignee.setClienteId((int)out.get("clienteid"));
		 consignee.setConsignatarioId((int)out.get("consignatarioid"));
		 consignee.setConsignatarioActivo((boolean)out.get("consignatarioactivo"));
		 consignee.setConsignatarioNombre((String)out.get("consignatarionombre"));
		 consignee.setConsignatarioFechaCreacion(out.get("consignatariofechacreacion").toString());
		 consignee.setConsignatarioFechaModificacion(out.get("consignatariofechamodificacion").toString());
		 
		 return consignee;	
	    }
	}
	
	public List<Consignatario> getConsignatarios(){

		String sql = "SELECT * FROM consignatario";

		List<Consignatario> lista = new ArrayList<>();

		lista =  this.jdbcTemplate.query(sql, new RowMapper<Consignatario>() {
		        @Override
		        public Consignatario mapRow(ResultSet rs, int i) throws SQLException {
		         Consignatario consignee = new Consignatario();
		   		 
		         consignee.setClienteId(rs.getInt("clienteid"));
		         consignee.setConsignatarioActivo(rs.getBoolean("consignatarioActivo")); 
		   		 consignee.setConsignatarioId(rs.getInt("consignatarioid"));
		   		 consignee.setConsignatarioNombre(rs.getString("consignatarioNombre"));
		   		 consignee.setConsignatarioFechaCreacion(rs.getString("consignatariofechacreacion"));
		   		 consignee.setConsignatarioFechaModificacion(rs.getString("consignatariofechamodificacion"));
		   		 
		         return consignee;
		        }
		    });

		return lista;
	 }
	
public int deleteConsignatario(int id) {
		
		String  sql = "SELECT * FROM consignatario where consignatarioid=" + id;
		 
	    List<Consignatario>  list = this.jdbcTemplate.query(sql, new RowMapper<Consignatario>() {
	        @Override
	        public  Consignatario mapRow(ResultSet rs, int i) throws SQLException {
	        	Consignatario consignee = new Consignatario();
		   		 
		         consignee.setClienteId(rs.getInt("clienteid"));
		         consignee.setConsignatarioActivo(rs.getBoolean("consignatarioActivo")); 
		   		 consignee.setConsignatarioId(rs.getInt("consignatarioid"));
		   		 consignee.setConsignatarioNombre(rs.getString("consignatarioNombre"));
		   		 consignee.setConsignatarioFechaCreacion(rs.getString("consignatariofechacreacion"));
		   		 consignee.setConsignatarioFechaModificacion(rs.getString("consignatariofechamodificacion"));
		   		 
		         return consignee;
	        }
	    });
	    
	    if(list.size()>0) {
	    	call = new SimpleJdbcCall(dataSourceConf).withFunctionName("deleteconsignee");
			   SqlParameterSource in = new MapSqlParameterSource().addValue("idconsignee", id);		  
			   int resultado= call.executeFunction(Integer.class,in);
			  
			   return resultado;
	    }else {	
		   
		  
		   return 0;
		 }
	}
	
}
