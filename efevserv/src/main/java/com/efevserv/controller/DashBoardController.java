package com.efevserv.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin
@Controller
public class DashBoardController {

	@GetMapping("/dashboard")
	public String dashBoard() {

		return "dashboard";
	}
	
	@GetMapping("/cliente")
	public String customer() {

		return "customers";
	}
	@GetMapping("/consignatario")
	public String consignee() {

		return "consignee";
	}
	
}
