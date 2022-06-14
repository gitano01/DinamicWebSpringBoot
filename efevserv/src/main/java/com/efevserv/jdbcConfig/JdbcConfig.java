package com.efevserv.jdbcConfig;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class JdbcConfig {

	@Bean
	public  DataSource myPgSqlDataSource() {
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		
		dataSource.setDriverClassName("org.postgresql.Driver");
		dataSource.setUrl("jdbc:postgresql://localhost:5432/evser");
		dataSource.setUsername("postgres");
		dataSource.setPassword("postgres");
		return dataSource;
	}

}
