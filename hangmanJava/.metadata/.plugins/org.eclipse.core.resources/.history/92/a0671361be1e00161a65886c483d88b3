package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="scores")
public class Score {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="initials")
	private String initials;
	
	@Column(name="score")
	private Integer score;

	public Score() {
		super();
	}

	public Score(String initials, Integer score) {
		super();
		this.initials = initials;
		this.score = score;
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
