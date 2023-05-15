package pl.league_games.club;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import pl.league_games.goal.Goal;
import pl.league_games.match.Match;
import pl.league_games.player.Player;

@Entity
@Table(name = "CLUBS")
public class Club implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private String country;
	private Date foundationDate;
	private String trainer;
	private List<Player> players = new ArrayList<Player>();
	private List<Match> homeMatches = new ArrayList<Match>();
	private List<Match> awayMatches = new ArrayList<Match>();
	private List<Goal> goals = new ArrayList<Goal>();
	
	@Id
	@GeneratedValue
	@Column(name="CLUB_ID")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public Date getFoundationDate () {
		return foundationDate;
	}
	public void setFoundationDate (Date foundationDate) {
		this.foundationDate = foundationDate;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	@OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public List<Player> getPlayers(){
		return players;
	}
	public void setPlayers(List<Player> players){
		this.players = players;
	}
	@OneToMany(mappedBy = "homeClub", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	public List<Match> getHomeMatches(){
		return homeMatches;
	}
	public void setHomeMatches(List<Match> homeMatches){
		this.homeMatches = homeMatches;
	}
	@OneToMany(mappedBy = "awayClub", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	public List<Match> getAwayMatches(){
		return awayMatches;
	}
	public void setAwayMatches(List<Match> awayMatches){
		this.awayMatches = awayMatches;
	}
	@OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	public List<Goal> getGoals() {
		return goals;
	}
	public void setGoals(List<Goal> goals) {
		this.goals = goals;
	}
}


