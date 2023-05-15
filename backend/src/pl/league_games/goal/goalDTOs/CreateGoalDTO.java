package pl.league_games.goal.goalDTOs;

public class CreateGoalDTO {
	private int minute;
	
	public CreateGoalDTO(){}
	public CreateGoalDTO(int minute){
		this.minute = minute;
	}
	public int getMinute(){
		return minute;
	}
}
