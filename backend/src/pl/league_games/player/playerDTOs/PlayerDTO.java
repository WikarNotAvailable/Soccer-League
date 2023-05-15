package pl.league_games.player.playerDTOs;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import pl.league_games.goal.Goal;
import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.match.Match;
import pl.league_games.match.matchDTOs.MatchNoP;

public class PlayerDTO {
	private int id;
	private String firstName;
	private String surname;
	private Date dateOfBirth;
	private String nationality;
	private String position;
	private int clubID;
	private List<MatchNoP> matches = new ArrayList<MatchNoP>();
	private List<GoalDTO> goals = new ArrayList<GoalDTO>();
	
	public PlayerDTO(int id, String firstName, String surname, Date dateOfBirth, String nationality, String position, int clubID, List<Match> matches, List<Goal> goals){ 
		this.id = id;
		this.firstName = firstName;
		this.surname = surname;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.position = position;
		this.clubID = clubID;
		
		for(Match m : matches){
			this.matches.add(new MatchNoP(m.getId(), m.getMatchDate(), m.getScore(), m.getHomeClub(), m.getAwayClub()));
		}
		
		for(Goal g : goals){
			this.goals.add(new GoalDTO(g.getId(), g.getMinute(), g.getPlayer().getId(), g.getMatch().getId(), g.getClub().getId()));
		}
	}
	public int getId() {
		return id;
	}
	public String getFirstName()
	{
		return firstName;
	}
	public String getSurname()
	{
		return surname;
	}
	public Date getDateOfBirth()
	{
		return dateOfBirth;
	}
	public String getNationality()
	{
		return nationality;
	}
	public String getPosition()
	{
		return position;
	}
	public int getClubID()
	{
		return clubID;
	}	
	public List<MatchNoP> getPMatches(){
		return matches;
	} 
	public List<GoalDTO> getGoals(){
		return goals;
	}
}
