package pl.league_games.goal;

import java.util.ArrayList;
import java.util.List;

import pl.league_games.goal.goalDTOs.GoalDTO;

public class Goals {
	private List<GoalDTO> goals = new ArrayList<GoalDTO>();
	
	public Goals(List<GoalDTO> goals){
		super();
		this.goals = goals;
	}
	
	public Goals(){}
	
	public List<GoalDTO> getGoals(){
		return goals;
	}
	
	public void setGoals(List<GoalDTO> goals){
		this.goals = goals;
	}
}
