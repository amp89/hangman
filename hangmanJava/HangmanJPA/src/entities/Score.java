package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Score {

	@Id
	private Integer id;
	
	@Column(name="initials")
	private String initials;
	
	@Column(name="score")
	private Integer score;

	public Score() {
		super();
	}

	public Score(Integer id, String initials, Integer score) {
		super();
		this.id = id;
		this.initials = initials;
		this.score = score;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getInitials() {
		return initials;
	}

	public void setInitials(String initials) {
		this.initials = initials;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}
	
	
	
	
}
