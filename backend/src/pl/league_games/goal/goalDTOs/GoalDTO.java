package pl.league_games.goal.goalDTOs;

public class GoalDTO {
	private int id;
	private int minute;
	private int playerID;
	private int matchID;
	private int clubID;
	
	public GoalDTO(int id, int minute, int playerID, int matchID, int clubID){
		this.id = id;
		this.minute = minute;
		this.playerID = playerID;
		this.matchID = matchID;
		this.clubID = clubID;
	}
	public int getId() {
		return id;
	}
	public int getMinute()
	{
		return minute;
	}
	public int getPlayerID(){
		return playerID;
	}
	public int getMatchID(){
		return matchID;
	}
	public int getClubID(){
		return clubID;
	}
}
