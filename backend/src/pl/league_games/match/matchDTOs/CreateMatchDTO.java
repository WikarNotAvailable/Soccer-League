package pl.league_games.match.matchDTOs;

import java.sql.Date;
import java.util.List;

public class CreateMatchDTO {
	private Date matchDate;
	private String score;
	private List<Integer> playerIDs;
	
	public CreateMatchDTO(){}
	public CreateMatchDTO(Date matchDate, String score, List<Integer> playerIDs){
		this.matchDate = matchDate;
		this.score = score;
		this.playerIDs = playerIDs;
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
