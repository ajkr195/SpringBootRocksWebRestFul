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
import javax.validation.constraints.Size;

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
	
	@NotEmpty(message = "Username can not be empty !")
	@Size(min = 2, message = "Username should be atleast 2 characters long !")
	@Column(name = "username")
	private String username;
	
	@NotEmpty(message = "useremail can not be empty !")
	@Size(min = 2, message = "useremail should be atleast 2 characters long !")
	@Column(name = "useremail")
	private String useremail;
	
	@NotEmpty(message = "userfirstname can not be empty !")
	@Size(min = 2, message = "userfirstname should be atleast 2 characters long !")
	@Column(name = "userfirstname")
	private String userfirstname;
	
	@NotEmpty(message = "userlastname can not be empty !")
	@Size(min = 2, message = "userlastname should be atleast 2 characters long !")
	@Column(name = "userlastname")
	private String userlastname;
	
	@NotEmpty(message = "useraddress can not be empty !")
	@Size(min = 2, message = "useraddress should be atleast 2 characters long !")
	@Column(name = "useraddress")
	private String useraddress;
	
	@NotNull(message = "userenabled can not be empty !")
	@Column(name = "userenabled", columnDefinition = "boolean default false")
	private boolean userenabled;
	
	@NotEmpty(message = "userconfirmationtoken can not be empty !")
	@Size(min = 2, message = "userconfirmationtoken should be atleast 2 characters long !")
	@Column(name = "userconfirmationtoken")
	private String userconfirmationtoken;


}
