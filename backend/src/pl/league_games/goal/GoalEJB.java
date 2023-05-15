package pl.league_games.goal;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import pl.league_games.club.Club;
import pl.league_games.match.Match;
import pl.league_games.player.Player;

@Stateless
public class GoalEJB {
 
	@PersistenceContext(name="league_games")
	EntityManager manager;
	
	public void create(Goal goal, int playerID, int matchID, int clubID){
		Player player = manager.find(Player.class, playerID);
		Match match = manager.find(Match.class, matchID);
		Club club = manager.find(Club.class, clubID);
		
		goal.setPlayer(player);
		goal.setMatch(match);
		goal.setClub(club);
		
		manager.persist(goal);
	}
	public void delete(int goalID){
		Goal goal = manager.find(Goal.class, goalID);
		
		Player player = manager.find(Player.class, goal.getPlayer().getId());
		Match match = manager.find(Match.class, goal.getMatch().getId());
		Club club = manager.find(Club.class, goal.getClub().getId());
		
		player.getGoals().remove(goal);
		match.getGoals().remove(goal);
		club.getGoals().remove(goal);
		
		goal.setPlayer(null);
		goal.setMatch(null);
		goal.setClub(null);
		
		manager.remove(goal);
	}
	public Goal find(int goalID){
		return manager.find(Goal.class, goalID);
	}
	public List<Goal> get(){
		List<Goal> list = manager.createQuery("select g from Goal g", Goal.class).getResultList();
		
		return list;
	}
	public void update(Goal updatedGoal, int playerID, int matchID, int clubID){
		Player currentPlayer = manager.find(Player.class, playerID);
		Match currentMatch = manager.find(Match.class, matchID);
		Club currentClub = manager.find(Club.class, clubID);
		
		updatedGoal.setPlayer(currentPlayer);
		updatedGoal.setMatch(currentMatch);
		updatedGoal.setClub(currentClub);
		
		manager.merge(updatedGoal);
	}
}
