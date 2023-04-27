package Soccer_League;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@XmlRootElement
public class Match implements Serializable{
	int id;
	Date date;
	String score;
	Club homeClub;
	Club awayClub;
	
	@Id
	@GeneratedValue
	@XmlAttribute
	public int getId() {
		return id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this. date = date;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this. score = score;
	}
	@ManyToOne
	public Club getHomeClub() {
		return homeClub;
	}
	public void setHomeClub (Club homeClub) {
		this. homeClub = homeClub;
	}
	@ManyToOne
	public Club getAwayClub () {
		return awayClub;
	}
	public void setAwayClub (Club awayClub) {
		this. awayClub = awayClub;
	}
	public void setId(int id) {
		this.id = id;
	}
}
