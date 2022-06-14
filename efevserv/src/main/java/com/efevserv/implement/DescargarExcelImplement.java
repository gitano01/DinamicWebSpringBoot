package com.efevserv.implement;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import com.efevserv.jdbcConfig.JdbcConfig;
import com.efevserv.model.response.Contacto;
import com.efevserv.service.ExcelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DescargarExcelImplement implements ExcelService{


	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	JdbcConfig jdbcConfig = new JdbcConfig();
	DataSource dataSourceConf = jdbcConfig.myPgSqlDataSource();
	JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSourceConf);	 
	SimpleJdbcCall call;
	
	public List<Contacto> listarContactos(){
		
		String sql = "SELECT * FROM contacto";

		List<Contacto> lista = new ArrayList<>();

		lista =  this.jdbcTemplate.query(sql, new RowMapper<Contacto>() {
		        @Override
		        public Contacto mapRow(ResultSet rs, int i) throws SQLException {
		         Contacto contacto = new Contacto();
		   		 contacto.setId(Long.parseLong(rs.getString("contactoid"))); 
		   		 contacto.setNombre(rs.getString("contactonombre"));
		   		 contacto.setApellido(rs.getString("contactoapellido"));
		   		 contacto.setTelefono(rs.getString("contactotelefono"));
		   		 contacto.setDireccion(rs.getString("contactodireccion"));
		         return contacto;
		        }
		    });

		return lista;
		
	}
	
	@Override
	public ByteArrayInputStream export() {
		List<Contacto> contactos = listarContactos();
		try(Workbook workbook = new XSSFWorkbook()){
			Sheet sheet = workbook.createSheet("Contacts");
			
			Row row = sheet.createRow(0);
			
			// Define header cell style
	        CellStyle headerCellStyle = workbook.createCellStyle();
	        headerCellStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
	        headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	        
	        // Creating header cells 
	        Cell cell = row.createCell(0);
	        cell.setCellValue("Identificador");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(1);
	        cell.setCellValue("Nombre");
	        cell.setCellStyle(headerCellStyle);
	
	        cell = row.createCell(2);
	        cell.setCellValue("Apellido");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(3);
	        cell.setCellValue("Correo");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(4);
	        cell.setCellValue("Telefono");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(5);
	        cell.setCellValue("Direccion");
	        cell.setCellStyle(headerCellStyle);
	        
	        // Creating data rows for each contact
	        for(int i = 0; i < contactos.size(); i++) {
	        	Row dataRow = sheet.createRow(i + 1);
	        	dataRow.createCell(0).setCellValue(contactos.get(i).getId());
	        	dataRow.createCell(1).setCellValue(contactos.get(i).getNombre());
	        	dataRow.createCell(2).setCellValue(contactos.get(i).getApellido());
	        	dataRow.createCell(3).setCellValue(contactos.get(i).getCorreo());
	        	dataRow.createCell(4).setCellValue(contactos.get(i).getTelefono());
	        	dataRow.createCell(5).setCellValue(contactos.get(i).getDireccion());
	        	
	        }
	
	        // Making size of column auto resize to fit with data
	        sheet.autoSizeColumn(0);
	        sheet.autoSizeColumn(1);
	        sheet.autoSizeColumn(2);
	        sheet.autoSizeColumn(3);
	        sheet.autoSizeColumn(4);
	        sheet.autoSizeColumn(5);
	        
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        workbook.write(outputStream);
	        return new ByteArrayInputStream(outputStream.toByteArray());
		} catch (IOException ex) {
			logger.error("Error during export Excel file", ex);
			return null;
		}
	}
	
	public ByteArrayInputStream export(List<Contacto> contactos) {
		
		try(Workbook workbook = new XSSFWorkbook()){
			Sheet sheet = workbook.createSheet("Contacts");
			
			Row row = sheet.createRow(0);
			
			// Define header cell style
	        CellStyle headerCellStyle = workbook.createCellStyle();
	        headerCellStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
	        headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	        
	        // Creating header cells 
	        Cell cell = row.createCell(0);
	        cell.setCellValue("Identificador");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(1);
	        cell.setCellValue("Nombre");
	        cell.setCellStyle(headerCellStyle);
	
	        cell = row.createCell(2);
	        cell.setCellValue("Apellido");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(3);
	        cell.setCellValue("Correo");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(4);
	        cell.setCellValue("Telefono");
	        cell.setCellStyle(headerCellStyle);
	        
	        cell = row.createCell(5);
	        cell.setCellValue("Direccion");
	        cell.setCellStyle(headerCellStyle);
	        
	        // Creating data rows for each contact
	        for(int i = 0; i < contactos.size(); i++) {
	        	Row dataRow = sheet.createRow(i + 1);
	        	dataRow.createCell(0).setCellValue(contactos.get(i).getId());
	        	dataRow.createCell(1).setCellValue(contactos.get(i).getNombre());
	        	dataRow.createCell(2).setCellValue(contactos.get(i).getApellido());
	        	dataRow.createCell(3).setCellValue(contactos.get(i).getCorreo());
	        	dataRow.createCell(4).setCellValue(contactos.get(i).getTelefono());
	        	dataRow.createCell(5).setCellValue(contactos.get(i).getDireccion());
	        	
	        }
	
	        // Making size of column auto resize to fit with data
	        sheet.autoSizeColumn(0);
	        sheet.autoSizeColumn(1);
	        sheet.autoSizeColumn(2);
	        sheet.autoSizeColumn(3);
	        sheet.autoSizeColumn(4);
	        sheet.autoSizeColumn(5);
	        
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        workbook.write(outputStream);
	        return new ByteArrayInputStream(outputStream.toByteArray());
		} catch (IOException ex) {
			logger.error("Error during export Excel file", ex);
			return null;
		}
	}
	
}

