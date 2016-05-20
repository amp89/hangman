package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import data.HangmanDAO;
import entities.Score;
import entities.Word;

@Controller
public class HangmanController {

	@Autowired
	HangmanDAO dao;
	
	@ResponseBody
	@RequestMapping("getword/{difficulty}")
	public Word getWord(@PathVariable Integer difficulty){
		Word w = dao.getWord(difficulty);
		return w;
	}
	
	
	@ResponseBody
	@RequestMapping(value="submitscore", method = RequestMethod.POST)
	public void submitScore(@RequestBody Score score){
		System.out.println("IN CONTROLLER TO SUBMIT SCORE");
		System.out.println(score);
		dao.addScore(score);
		System.out.println("IN CONTROLLER AFTER SUBMIT SCORE");
	}
	
	
	
	@ResponseBody
	@RequestMapping("topscores")
	public List<Score> getTopScores(){
		System.out.println("Returning stuff");
		return dao.getTopFiveScores();
	}
	
}
