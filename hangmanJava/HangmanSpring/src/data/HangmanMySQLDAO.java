package data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Score;
import entities.Word;

@Transactional
public class HangmanMySQLDAO implements HangmanDAO {

	private final int wordListLength = 364293;

	@PersistenceContext
	private EntityManager em;

	@Override
	public Word getWord(Integer difficulty) {
		int min = 0, max = 0;
		switch (difficulty) {
		case 1:
			min = 3;
			max = 4;
			break;
		case 2:
			min = 5;
			max = 7;
			break;
		case 3:
			min = 8;
			max = 12;
			break;
		case 4:
			min = 12;
			max = 20;
			break;
		case 5:
			min = 20;
			max = 99;
			break;
		}

		System.out.println(min);
		System.out.println(max);
		Word w = null;
		while (true) {
			int randomId = (int) (Math.random() * wordListLength);
			w = em.find(Word.class, randomId);
			if (w != null) {

				if (w.getName().length() >= min && w.getName().length() <= max) {
					break;
				} else {
					continue;
				}
			}
		}
		;

		System.out.println("WORD RETURED: " + w.getName());

		return w;
	}

	@Override
	public void addScore(Score score) {
		System.out.println("TO ADD: " + score);
		em.persist(score);
		System.out.println("score added");

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Score> getTopFiveScores() {
		List<Score> allScores = em.createQuery("SELECT s FROM Score s", Score.class).getResultList();
		List<Score> topScores = new ArrayList<>();
		Collections.sort(allScores, new Comparator() {
			public int compare(Object s1, Object s2) {

				Integer score1 = ((Score) s1).getScore();
				Integer score2 = ((Score) s2).getScore();

				return score2.compareTo(score1);
			}

		});
		for (int i = 0; i < 5; i++) {
			topScores.add(allScores.get(i));
		}

		return topScores;
	}

}
