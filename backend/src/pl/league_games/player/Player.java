package pl.league_games.player;

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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import pl.league_games.club.Club;
import pl.league_games.goal.Goal;
import pl.league_games.match.Match;


@Entity
@Table(name = "PLAYERS")
public class Player implements Serializable {
	
	private static final long serialVersionUID = 2L;
	private int id;
	private String firstName;
	private String surname;
	private Date dateOfBirth;
	private String nationality;
	private String position;
	private Club club;
	private List<Match> matches = new ArrayList<Match>();
	private List<Goal> goals = new ArrayList<Goal>();

	@Id
	@GeneratedValue
	@Column(name="PLAYER_ID")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName()
	{
		return firstName;
	}
	public void setFirstName(String firstName)
	{
		this.firstName=firstName;
	}
	public String getSurname()
	{
		return surname;
	}
	public void setSurname(String surname)
	{
		this.surname=surname;
	}
	public Date getDateOfBirth()
	{
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth)
	{
		this.dateOfBirth=dateOfBirth;
	}
	public String getNationality()
	{
		return nationality;
	}
	public void setNationality(String nationality)
	{
		this.nationality=nationality;
	}
	public String getPosition()
	{
		return position;
	}
	public void setPosition(String position)
	{
		this.position=position;
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
	
	@ManyToMany(cascade = {
		CascadeType.MERGE})
	@JoinTable(name = "player_in_match",
     	joinColumns = @JoinColumn(name = "player_id"),
     	inverseJoinColumns = @JoinColumn(name = "match_id"))
	public List<Match> getMatches() {
		return matches;
	}
	public void setMatches(List<Match> matches) {
		this.matches = matches;
	}
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	public List<Goal> getGoals() {
		return goals;
	}
	public void setGoals(List<Goal> goals) {
		this.goals = goals;
	}

}

