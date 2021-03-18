package com.spring.boot.rocks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ValidationUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.boot.rocks.model.AppUser;
import com.spring.boot.rocks.model.payload.JsonResponse;
import com.spring.boot.rocks.repository.AppUserRepository;

@Controller
public class WebFulController {

	@Autowired
	AppUserRepository appUserRepository;

	@GetMapping("/")
	public String listUsers() {
		return "index";
	}

	@GetMapping("/index2")
	public String listUsers2() {
		return "index2";
	}

	@GetMapping("/index3")
	public String listUsers3(Model model) {
		
		model.addAttribute("users",appUserRepository.findAll());
		
		return "index3";
	}

	@RequestMapping(value = "/index3", method = RequestMethod.POST)
	public @ResponseBody JsonResponse addUser(@ModelAttribute(value = "user") AppUser user, BindingResult result) {
		JsonResponse theResponse = new JsonResponse();
		ValidationUtils.rejectIfEmpty(result, "username", "username can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "useremail", "useremail can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "userfirstname", "userfirstname can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "userlastname", "userlastname can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "useraddress", "useraddress can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "userenabled", "userenabled can not be empty.");
		ValidationUtils.rejectIfEmpty(result, "userconfirmationtoken", "userconfirmationtoken not be empty");
		if (!result.hasErrors()) {
			appUserRepository.save(user);
			theResponse.setStatus("SUCCESS");
			theResponse.setResult(user);
		} else {
			theResponse.setStatus("FAIL");
			theResponse.setResult(result.getAllErrors());
		}
		return theResponse;
	}
	
	@GetMapping("/index4")
	public String listUsers4(Model model) {
		
		model.addAttribute("users",appUserRepository.findAll());
		
		return "index4";
	}

}
