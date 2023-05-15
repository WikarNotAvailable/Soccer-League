package pl.league_games.club.clubDTOs;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import pl.league_games.goal.Goal;
import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.match.Match;
import pl.league_games.match.matchDTOs.MatchNoP;
import pl.league_games.player.Player;
import pl.league_games.player.playerDTOs.PlayerNoM;

public class ClubDTO {
	private int id;
	private String name;
	private String country;
	private Date foundationDate;
	private String trainer;
	private List<PlayerNoM> players = new ArrayList<PlayerNoM>();
	private List<MatchNoP> homeMatches = new ArrayList<MatchNoP>();
	private List<MatchNoP> awayMatches = new ArrayList<MatchNoP>();
	private List<GoalDTO> goals = new ArrayList<GoalDTO>();
	
	public ClubDTO(int id, String name, String country, Date foundationDate, String trainer, List<Player> players, List<Match> homeMatches, List<Match> awayMatches, List<Goal> goals){
		this.id = id;
		this.name = name;
		this.country = country;
		this.foundationDate = foundationDate;
		this.trainer = trainer;
		
		for(Player p : players ){
			this.players.add(new PlayerNoM(p.getId(), p.getFirstName(), p.getSurname(), p.getDateOfBirth(),
					p.getNationality(), p.getPosition(), p.getClub()));
		}
		
		for(Match m : homeMatches){
			this.homeMatches.add(new MatchNoP(m.getId(), m.getMatchDate(), m.getScore(), m.getHomeClub(), m.getAwayClub()));
		}
		
		for(Match m : awayMatches){
			this.awayMatches.add(new MatchNoP(m.getId(), m.getMatchDate(), m.getScore(), m.getHomeClub(), m.getAwayClub()));
		}
		
		for(Goal g : goals){
			this.goals.add(new GoalDTO(g.getId(), g.getMinute(), g.getPlayer().getId(), g.getMatch().getId(), g.getClub().getId()));
		}
		
	}
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getCountry() {
		return country;
	}
	public Date getFoundationDate () {
		return foundationDate;
	}
	public String getTrainer() {
		return trainer;
	}
	public List<PlayerNoM> getPlayers(){
		return players;
	}
	public List<MatchNoP> getHomeMatches(){
		return homeMatches;
	}
	public List<MatchNoP> getAwayMatches(){
		return awayMatches;
	}
	public List<GoalDTO> getGoals(){
		return goals;
	}
}
