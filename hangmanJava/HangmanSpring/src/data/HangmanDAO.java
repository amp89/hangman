package data;

import java.util.List;

import entities.Score;
import entities.Word;

public interface HangmanDAO {

	public Word getWord(Integer difficulty);
	
	public void addScore(Score score);
	
	public List<Score> getTopFiveScores();
	
	
	
}
