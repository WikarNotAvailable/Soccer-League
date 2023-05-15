package pl.league_games.match;

import java.util.ArrayList;
import java.util.List;

import pl.league_games.match.matchDTOs.MatchDTO;

public class Matches {
	private List<MatchDTO> matches = new ArrayList<MatchDTO>();

	public Matches(List<MatchDTO> matches) {
		super();
		this.matches = matches;
	}

	public Matches() {}
	
	public List<MatchDTO> getMatches() {
		return matches;
	}

	public void setMatches(List<MatchDTO> matches) {
		this.matches = matches;
	}
}
