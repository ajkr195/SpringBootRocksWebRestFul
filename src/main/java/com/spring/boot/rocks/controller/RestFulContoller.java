package com.spring.boot.rocks.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.boot.rocks.model.AppUser;
import com.spring.boot.rocks.repository.AppUserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping ("/api") 
public class RestFulContoller {

	@Autowired
	AppUserRepository appUserRepository;
	
	@GetMapping(path = "/appusers")
	public List<AppUser> getAppUsers() {
		return appUserRepository.findAll();
	}
	
	@GetMapping("/findappuser/{id}")
	public Optional<AppUser> getUser(@PathVariable long id) {
		return appUserRepository.findById(id);
	}
	
	@PostMapping("/appUser")
	public AppUser addAppUser(@RequestBody AppUser appUser) {
		log.info("Creating New User...");
		return appUserRepository.save(appUser);
	}

	@PutMapping("/appUser")
	public AppUser  updateAppUser(@RequestBody AppUser appUser) {
		log.info("Updating User with ID: {}", appUser.getId());
		return appUserRepository.save(appUser);
	}
	
	@PostMapping(value = "/activateUser/{id}")
	public AppUser activateUser(@PathVariable Long id) {
		AppUser appUser = appUserRepository.findById(id).get();
		log.info("Activating User :: " + id);
		appUserRepository.setAppUserAsActiveById(id);
		return appUser;
	}
	
	@PostMapping(value = "/deActivateUser/{id}")
	public AppUser deActivateUser(@PathVariable Long id) {
		AppUser appUser = appUserRepository.findById(id).get();
		log.info("Activating User :: " + id);
		appUserRepository.setAppUserAsInActiveById(id);
		return appUser;
	}
	
	@DeleteMapping(value = "/deleteUser/{id}")
	public AppUser deleteUser(@PathVariable Long id) {
		AppUser appUser = appUserRepository.findById(id).get();
		appUserRepository.deleteById(id);
		return appUser;
	}
	
	@DeleteMapping(value = "/deleteAppUser/{id}")
	public AppUser deleteAppUser(@PathVariable Long id) {
		AppUser appUser = appUserRepository.findById(id).get();
		appUserRepository.deleteById(id);
		return appUser;
	}
	
	
}
