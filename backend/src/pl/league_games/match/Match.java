package pl.league_games.match;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import pl.league_games.club.Club;
import pl.league_games.goal.Goal;
import pl.league_games.player.Player;


@Entity
@Table(name = "MATCHES")
public class Match implements Serializable{
	
	private static final long serialVersionUID = 3L;
	private int id;
	private Date matchDate;
	private String score;
	private Club homeClub;
	private Club awayClub;
	private List<Player> players = new ArrayList<Player>();
	private List<Goal> goals = new ArrayList<Goal>();

	@Id
	@GeneratedValue
	@Column(name="MATCH_ID")
	public int getId() {
		return id;
	}
	public void setId(int id){
		this.id = id;
	}
	public Date getMatchDate() {
		return matchDate;
	}
	public void setMatchDate(Date matchDate) {
		this.matchDate = matchDate;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="HOME_CLUB_ID", referencedColumnName="CLUB_ID")
	public Club getHomeClub() {
		return homeClub;
	}
	public void setHomeClub (Club homeClub) {
		this.homeClub = homeClub;
	}
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="AWAY_CLUB_ID", referencedColumnName="CLUB_ID")
	public Club getAwayClub () {
		return awayClub;
	}
	public void setAwayClub (Club awayClub) {
		this.awayClub = awayClub;
	}
	@ManyToMany(mappedBy = "matches")
	public List<Player> getPlayers() {
		return players;
	}
	public void setPlayers(List<Player> players) {
		this.players = players;
	}
	@OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	public List<Goal> getGoals() {
		return goals;
	}
	public void setGoals(List<Goal> goals) {
		this.goals = goals;
	}
}
