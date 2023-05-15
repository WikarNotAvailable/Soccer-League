package pl.league_games.match.matchDTOs;

import java.sql.Date;
import java.util.List;

public class UpdateMatchDTO {
	private int id;
	private Date matchDate;
	private String score;
	private List<Integer> playerIDs;
	
	public UpdateMatchDTO(){}
	public UpdateMatchDTO(int id, Date matchDate, String score, List<Integer> playerIDs){
		this.id = id;
		this.matchDate = matchDate;
		this.score = score;
		this.playerIDs = playerIDs;
		
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
	public List<Integer> getPlayerIDs(){
		return playerIDs;
	}
}
