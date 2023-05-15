package pl.league_games.goal.goalDTOs;

public class UpdateGoalDTO {
	private int id;
	private int minute;
	
	public UpdateGoalDTO(){}
	public UpdateGoalDTO(int id, int minute){
		this.id = id;
		this.minute = minute;
	}	
	public int getId() {
		return id;
	}
	public int getMinute()
	{
		return minute;
	}
}
