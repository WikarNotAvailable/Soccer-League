package pl.league_games.match.matchDTOs;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import pl.league_games.goal.Goal;
import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.player.Player;
import pl.league_games.player.playerDTOs.PlayerNoM;

public class MatchDTO {
	
	private int id;
	private Date matchDate;
	private String score;
	private int homeClubID;
	private int awayClubID;
	private List<PlayerNoM>players = new ArrayList<PlayerNoM>();
	private List<GoalDTO> goals = new ArrayList<GoalDTO>();
	
	public MatchDTO(int id, Date matchDate, String score, int homeClubID, int awayClubID, List<Player> players, List<Goal> goals){ 
		this.id = id;
		this.matchDate = matchDate;
		this.score = score;
		this.homeClubID = homeClubID;
		this.awayClubID = awayClubID;

		for(Player p : players ){
			this.players.add(new PlayerNoM(p.getId(), p.getFirstName(), p.getSurname(), p.getDateOfBirth(),
					p.getNationality(), p.getPosition(), p.getClub()));
		} 
		
		for(Goal g : goals){
			this.goals.add(new GoalDTO(g.getId(), g.getMinute(), g.getPlayer().getId(), g.getMatch().getId(), g.getClub().getId()));
		}
	}
	public int getId() {
		return id;
	}
	public Date getMatchDate() {
		return matchDate;
	}
	public String getScore() {
		return score;
	}
	public int getHomeClubID() {
		return homeClubID;
	}
	public int getAwayClubID() {
		return awayClubID;
	}
	
	public List<PlayerNoM> getMPlayers() {
		return players;
	} 
	public List<GoalDTO> getGoals(){
		return goals;
	}
}

