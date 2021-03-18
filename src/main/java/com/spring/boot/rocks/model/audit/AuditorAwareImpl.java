package com.spring.boot.rocks.model.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {

	
	@Override
	public Optional<String> getCurrentAuditor() {
		return Optional.of("System");
	}
	
	
	
	
	
	
//	@Override
//	public Optional<String> getCurrentAuditor() {
//		return Optional.of(getPrincipal());
//	}
//
//	private String getPrincipal() {
//		String userName = null;
//		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//		if (principal instanceof UserDetails) {
//			userName = ((UserDetails) principal).getUsername();
//		} else {
//			userName = principal.toString();
//		}
//		return userName;
//	}
}
