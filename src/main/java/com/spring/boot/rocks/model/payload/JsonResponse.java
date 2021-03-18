package com.spring.boot.rocks.model.payload;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonResponse {
	private String status;
	private Object result;
}
