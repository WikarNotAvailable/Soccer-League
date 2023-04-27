package Soccer_League;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class PlayersInMatch implements Serializable{
	Match match;
	Player player;
	
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
}
