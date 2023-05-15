package pl.league_games.player;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import pl.league_games.club.Club;
import pl.league_games.match.Match;

@Stateless
public class PlayerEJB {
	
	@PersistenceContext(name="league_games")
	EntityManager manager;

	
	public void create(Player player, int clubID) {
		Club club = manager.find(Club.class, clubID);
		player.setClub(club);

		manager.persist(player); 
	}
	public void delete(int playerID) {
		Player player = manager.find(Player.class, playerID);
		
		Club club = manager.find(Club.class, player.getClub().getId());
		club.getPlayers().remove(player);
		player.setClub(null);
		
		for(Match m : player.getMatches()){
			m.getPlayers().remove(player);
		}
		
		manager.remove(player);
	}
	public Player find(int playerID) {
		Player player = (Player) this.manager.createQuery("select distinct p from Player p left join fetch p.matches where p.id = :id").setParameter("id", playerID).getSingleResult();
		player = (Player) this.manager.createQuery("select distinct p from Player p left join fetch p.goals where p.id = :id").setParameter("id", playerID).getSingleResult();
		
		return player;
	}
	public List<Player> get() {
		List<Player> list = manager.createQuery("select distinct p from Player p left join fetch p.matches", Player.class).getResultList();
		list = manager.createQuery("select distinct p from Player p left join fetch p.goals", Player.class).getResultList();
		
		return list;
	}
	public void update(Player updatedPlayer, int clubID) {
		Player previousPlayer = manager.find(Player.class, updatedPlayer.getId());
		updatedPlayer.setMatches(previousPlayer.getMatches());
		updatedPlayer.setGoals(previousPlayer.getGoals());
		
		Club currentClub = manager.find(Club.class, clubID);
		updatedPlayer.setClub(currentClub);
			
		manager.merge(updatedPlayer);
	}

	
}

