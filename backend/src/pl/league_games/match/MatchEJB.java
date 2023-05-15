package pl.league_games.match;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import pl.league_games.club.Club;
import pl.league_games.player.Player;

@Stateless
public class MatchEJB {
	
	@PersistenceContext(name="league_games")
	EntityManager manager;
	
	public void create(Match match, int homeClubID, int awayClubID, List<Integer> playerIDs) {
		Club homeClub = manager.find(Club.class, homeClubID);
		Club awayClub = manager.find(Club.class, awayClubID);
		match.setHomeClub(homeClub);
		match.setAwayClub(awayClub);
		
		for(Integer id : playerIDs){
			Player p = manager.find(Player.class, id);
			match.getPlayers().add(p);
			p.getMatches().add(match);
		}
		manager.persist(match); 
	}
	public void delete(int matchID) {
		Match match = manager.find(Match.class, matchID);
		
		Club homeClub = manager.find(Club.class, match.getHomeClub().getId());
		Club awayClub = manager.find(Club.class, match.getAwayClub().getId());
		homeClub.getHomeMatches().remove(match);
		awayClub.getAwayMatches().remove(match);
		match.setHomeClub(null);
		match.setAwayClub(null);
		
		for(Player p : match.getPlayers()){
			p.getMatches().remove(match);
		}
		
		manager.remove(match);
	}
	public Match find(int matchID){
		Match match = (Match) this.manager.createQuery("select distinct m from Match m left join fetch m.players where m.id = :id").setParameter("id", matchID).getSingleResult();
		match = (Match) this.manager.createQuery("select distinct m from Match m left join fetch m.goals where m.id = :id").setParameter("id", matchID).getSingleResult();
		
		return match;
	}
	public List<Match> get() {
		List<Match> list =  manager.createQuery("select distinct m from Match m left join fetch m.players", Match.class).getResultList();
		list = manager.createQuery("select distinct m from Match m left join fetch m.goals", Match.class).getResultList();
		
		return list;
	}
	public void update(Match updatedMatch, int homeClubID, int awayClubID, List<Integer> playerIDs){
		Club currentHomeClub = manager.find(Club.class, homeClubID);
		Club currentAwayClub = manager.find(Club.class, awayClubID);
		updatedMatch.setHomeClub(currentHomeClub);
		updatedMatch.setAwayClub(currentAwayClub);
		
		Match previousMatch = manager.find(Match.class, updatedMatch.getId());
	
		updatedMatch.setGoals(previousMatch.getGoals());
		
		for(Player p : previousMatch.getPlayers()){
			p.getMatches().remove(previousMatch);
		}
		
		for(Integer id : playerIDs){
			Player p = manager.find(Player.class, id);
			updatedMatch.getPlayers().add(p);
			p.getMatches().add(updatedMatch);
		}
		
		manager.merge(updatedMatch);
	}
}
