package dataload;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import entities.Word;

public class LoadWords {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("hangman");
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		BufferedReader buf = null;
		try{
			buf = new BufferedReader(new FileReader("words.txt"),100000);
			System.out.println(buf.readLine());
			String line = "";
			while((line = buf.readLine()) != null){
				System.out.println(line);
				String wString = line;
				
				int wLength = wString.length();
				
				Word w = new Word(wString,wLength);
				
				em.persist(w);
			}
			
			
			
			
			
			
			
		}catch(IOException ioe){
			System.out.println(ioe);
			
		}finally{
			
			try {
				buf.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
		

		
		
		
		
		
		
		
		
		em.getTransaction().commit();
		
		
		em.close();
		emf.close();

	}

}
