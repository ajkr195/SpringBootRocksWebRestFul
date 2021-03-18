package com.spring.boot.rocks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebFulController {

	@GetMapping ("/")
	public String listUsers () {
		return "index";
	}
	
	@GetMapping ("/index2")
	public String listUsers2 () {
		return "index2";
	}
	
}
