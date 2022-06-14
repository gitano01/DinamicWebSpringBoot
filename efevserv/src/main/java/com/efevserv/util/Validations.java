package com.efevserv.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validations {

	public boolean validaNumero(String input) {
		
		 Pattern p = Pattern.compile("^([0-9])+$");
		 Matcher m = p.matcher(input);
		 boolean b = m.matches();		
		  return b;
	}
	
	public boolean validaCadena(String input) {
		
		 Pattern p = Pattern.compile("^([A-Za-z\\s\\ÁáÉéÍíÓóÚú]{1,255})?$");
		 Matcher m = p.matcher(input);
		 boolean b = m.matches();		
		  return b;
	}	
	
	
}
