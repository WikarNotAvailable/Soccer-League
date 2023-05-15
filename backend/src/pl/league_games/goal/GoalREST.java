package pl.league_games.goal;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import pl.league_games.goal.goalDTOs.CreateGoalDTO;
import pl.league_games.goal.goalDTOs.GoalDTO;
import pl.league_games.goal.goalDTOs.UpdateGoalDTO;

@Path(value="Goals")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class GoalREST implements IGoalREST {

	@EJB
	GoalEJB bean;
	GoalMapper mapper = new GoalMapper();
	
	@Override
	@POST
	public GoalDTO create(CreateGoalDTO createGoalDTO, @QueryParam("playerID") int playerID,@QueryParam("matchID") int matchID,@QueryParam("clubID") int clubID) {
		Goal newGoal = new Goal();
		newGoal.setMinute(createGoalDTO.getMinute());
		bean.create(newGoal, playerID, matchID, clubID);
		
		Goal goal = bean.find(newGoal.getId());
		GoalDTO goalDTO = mapper.GoalToDto(goal);
		
		return goalDTO;
	}
	@Override
	@GET
	@Path("/{goalID}")
	public GoalDTO find(@PathParam("goalID")int goalID) {
		Goal goal = bean.find(goalID);
		
		GoalDTO goalDTO = mapper.GoalToDto(goal);
		return goalDTO;
	}

	@Override
	@GET
	public Goals get() {
		List<Goal> lgoals = bean.get();
		List<GoalDTO> goalsDTO = new ArrayList<GoalDTO>();
		
		for(Goal g : lgoals){
			goalsDTO.add(mapper.GoalToDto(g));
		}
		Goals goals = new Goals(goalsDTO);
		return goals;
	}

	@Override
	@PUT
	public String update(UpdateGoalDTO updatedGoalDTO, @QueryParam("playerID") int playerID,@QueryParam("matchID") int matchID,@QueryParam("clubID") int clubID) {
		try{
			Goal currentGoal = bean.find(updatedGoalDTO.getId());
			Goal updatedGoal = mapper.UpdateDtoToGoal(updatedGoalDTO, currentGoal);
			bean.update(updatedGoal, playerID, matchID, clubID);
			
			return "Goal updated";
		} catch (Exception e){
			e.printStackTrace();
			return "Goal not updated, error happened";
		}
	}

	@Override
	@DELETE
	@Path("/{goalID}")
	public String delete(@PathParam("goalID")int goalID) {
		try{
			bean.delete(goalID);
			return "Goal deleted";
		} catch(Exception e){
			e.printStackTrace();
			return "Goal not deleted";
		}
	}

}
