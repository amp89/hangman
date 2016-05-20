package testing;


import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Score;
import entities.Word;

//import entities.Score;
//import entities.Word;

public class HangmanDBTest {
EntityManagerFactory emf;
EntityManager em;
	
	@Before
	public void setUp(){
		emf = Persistence.createEntityManagerFactory("hangman");
		em = emf.createEntityManager(); 
		
	}
	
	@Test
	public void wordId(){
		Integer i = 1;
		assertEquals(i,em.find(Word.class, 1).getId());
	}
	
	@Test
	public void wordName(){
		assertEquals("WORD",em.find(Word.class, 1).getName().toUpperCase());
		
	}
	
	@Test
	public void wordLength(){
		Integer i = 4;
		Integer j = em.find(Word.class,1).getName().length();
		assertEquals(i,j);
	}

	@Test
	public void scoreId(){
		Integer i = 1;
		assertEquals(i,em.find(Score.class, 1).getId());
		
	}
	
	@Test
	public void scoreInitials(){
		assertEquals("AMP",em.find(Score.class,1).getInitials());
	}
	
	@Test
	public void scoreScore(){
		Integer i = 99999;
		assertEquals(i,em.find(Score.class,1).getScore());
	}
	
	@Test
	public void stuff(){
		assertEquals(" "," ");
	}
	
	@After
	public void tearDown(){
		em.close();
		emf.close();
	}

}
