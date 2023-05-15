package pl.league_games.match;

import javax.ejb.Local;

import pl.league_games.match.matchDTOs.CreateMatchDTO;
import pl.league_games.match.matchDTOs.MatchDTO;
import pl.league_games.match.matchDTOs.UpdateMatchDTO;

@Local
public interface IMatchREST {
	public abstract MatchDTO create (CreateMatchDTO newMatchDTO, int homeClubID, int awayClubID);
	
	public abstract MatchDTO find(int matchID);
	
	public abstract Matches get();
	
	public abstract String update(UpdateMatchDTO updatedMatchDTO, int homeClubID, int awayClubID);
	
	public abstract String delete(int matchID);
}
