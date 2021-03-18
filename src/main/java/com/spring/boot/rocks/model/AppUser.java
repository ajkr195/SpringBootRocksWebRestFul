package com.spring.boot.rocks.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.spring.boot.rocks.model.audit.Auditable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user")

public class AppUser extends Auditable<String> implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@NotEmpty
	@Column(name = "username")
	private String username;
	
	@NotEmpty
	@Column(name = "useremail")
	private String useremail;
	
	@NotEmpty
	@Column(name = "userfirstname")
	private String userfirstname;
	
	@NotEmpty
	@Column(name = "userlastname")
	private String userlastname;
	
	@NotEmpty
	@Column(name = "useraddress")
	private String useraddress;
	
	@NotNull
	@Column(name = "userenabled", columnDefinition = "boolean default false")
	private boolean userenabled;
	
	@Column(name = "userconfirmationtoken")
	private String userconfirmationtoken;


}
