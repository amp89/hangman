package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import data.HangmanDAO;

@Controller
public class HangmanController {

	@Autowired
	HangmanDAO dao;
	
	
	
	
}
