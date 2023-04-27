package Soccer_League;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Goal implements Serializable{
	int id;
	Player player;
	int minute;
	Match match;
	Club club;
	
	@Id
	@GeneratedValue
	@XmlAttribute
	public int getId() {
		return id;
	}
	public int getMinute()
	{
		return minute;
	}
	public void setMinute(int minute)
	{
		this.minute=minute;
	}
	@ManyToOne
	public Player getPlayer()
	{
		return player;
	}
	public void setPlayer(Player player)
	{
		this.player=player;
	}
	@ManyToOne
	public Match getMatch()
	{
		return match;
	}
	public void setMatch(Match match)
	{
		this.match=match;
	}
	@ManyToOne
	public Club getClub()
	{
		return club;
	}
	public void setClub(Club club)
	{
		this.club=club;
	}
	public void setId(int id) {
		this.id = id;
	}
}
