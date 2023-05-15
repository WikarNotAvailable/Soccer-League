package pl.league_games.goal;

import javax.ejb.Local;

import pl.league_games.goal.goalDTOs.CreateGoalDTO;
import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.goal.goalDTOs.UpdateGoalDTO;

@Local
public interface IGoalREST {
	public abstract GoalDTO create (CreateGoalDTO createGoalDTO, int playerID, int matchID, int clubID);
	
	public abstract GoalDTO find(int goalID);
	
	public abstract Goals get();
	
	public abstract String update(UpdateGoalDTO updatedGoalDTO,int playerID, int matchID, int clubID);
	
	public abstract String delete(int goalID);
}
