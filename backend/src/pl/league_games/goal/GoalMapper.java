package pl.league_games.goal;

import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.goal.goalDTOs.UpdateGoalDTO;

public class GoalMapper {
	public GoalDTO GoalToDto(Goal goal){
		GoalDTO dto = new GoalDTO(goal.getId(), goal.getMinute(), 
				goal.getPlayer().getId(), goal.getMatch().getId(), goal.getClub().getId());
		
		return dto;
	}
	public Goal UpdateDtoToGoal(UpdateGoalDTO updatedGoalDTO, Goal currentGoal){
		Goal updatedGoal = new Goal();
		
		updatedGoal.setId(currentGoal.getId());
		
		if(updatedGoalDTO.getMinute() != 0)
			updatedGoal.setMinute(updatedGoalDTO.getMinute());
		else
			updatedGoal.setMinute(currentGoal.getMinute());
		
		return updatedGoal;
	}
}
