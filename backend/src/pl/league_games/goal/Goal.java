package pl.league_games.goal;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import pl.league_games.club.Club;
import pl.league_games.match.Match;
import pl.league_games.player.Player;

@Entity
@Table(name = "GOALS")
public class Goal implements Serializable{
	
	private static final long serialVersionUID = 4L;
	private int id;
	private int minute;
	private Player player;
	private Match match;
	private Club club;
	
	@Id
	@GeneratedValue
	@Column(name="GOAL_ID")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMinute()
	{
		return minute;
	}
	public void setMinute(int minute)
	{
		this.minute=minute;
	}
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "PLAYER_ID", referencedColumnName="PLAYER_ID")
	public Player getPlayer()
	{
		return player;
	}
	public void setPlayer(Player player)
	{
		this.player=player;
	}
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "MATCH_ID", referencedColumnName="MATCH_ID")
	public Match getMatch()
	{
		return match;
	}
	public void setMatch(Match match)
	{
		this.match=match;
	}
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "CLUB_ID", referencedColumnName="CLUB_ID")
	public Club getClub()
	{
		return club;
	}
	public void setClub(Club club)
	{
		this.club=club;
	}
	
}
