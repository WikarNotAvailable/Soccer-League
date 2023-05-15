package pl.league_games.club;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import pl.league_games.match.Match;
import pl.league_games.player.Player;

@Stateless
public class ClubEJB {
	
	@PersistenceContext(name="league_games")
	EntityManager manager;

	public void create(Club club) {
		manager.persist(club);
	}

	public void delete(int clubID) {
		Club club = manager.find(Club.class, clubID);
		
		for(Player p : club.getPlayers()){
			for(Match m : p.getMatches()){
				m.getPlayers().remove(p);
			}
		}
		
		for(Match m : club.getAwayMatches()){
			for(Player p : m.getPlayers()){
				p.getMatches().remove(m);
			}
		}
		
		for(Match m : club.getHomeMatches()){
			for(Player p : m.getPlayers()){
				p.getMatches().remove(m);
			}
		}
		manager.remove(club);
	}

	public Club find(int clubID) {
		Club club = (Club) this.manager.createQuery("select distinct c from Club c left join fetch c.players p where c.id = :id").setParameter("id", clubID).getSingleResult();
		club = (Club) this.manager.createQuery("select distinct c from Club c left join fetch c.homeMatches hm where c.id = :id").setParameter("id", clubID).getSingleResult();
		club = (Club) this.manager.createQuery("select distinct c from Club c left join fetch c.awayMatches am where c.id = :id").setParameter("id", clubID).getSingleResult();
		club = (Club) this.manager.createQuery("select distinct c from Club c left join fetch c.goals g where c.id = :id").setParameter("id", clubID).getSingleResult();
		
		return club;
	}


	public List<Club> get() {
		List<Club> list = manager.createQuery("select distinct c from Club c left outer join fetch c.players", Club.class).getResultList();
		list = manager.createQuery("select distinct c from Club c left outer join fetch c.homeMatches", Club.class).getResultList();
		list = manager.createQuery("select distinct c from Club c left outer join fetch c.awayMatches", Club.class).getResultList();
		list = manager.createQuery("select distinct c from Club c left outer join fetch c.goals", Club.class).getResultList();
		
		return list;
	}

	public void update(Club updatedClub) {
		Club previousClub = manager.find(Club.class, updatedClub.getId());
		updatedClub.setPlayers(previousClub.getPlayers());
		updatedClub.setHomeMatches(previousClub.getHomeMatches());
		updatedClub.setAwayMatches(previousClub.getAwayMatches());
		updatedClub.setGoals(previousClub.getGoals());
		
		manager.merge(updatedClub);
	}

	
}
