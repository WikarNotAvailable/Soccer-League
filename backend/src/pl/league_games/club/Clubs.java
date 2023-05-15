package pl.league_games.club;

import java.util.ArrayList;
import java.util.List;

import pl.league_games.club.clubDTOs.ClubDTO;

public class Clubs {
	private List<ClubDTO> clubs = new ArrayList<ClubDTO>();

	public Clubs(List<ClubDTO> clubs) {
		super();
		this.clubs = clubs;
	}

	public Clubs() {}
	
	public List<ClubDTO> getClubs() {
		return clubs;
	}

	public void setClubs(List<ClubDTO> clubs) {
		this.clubs = clubs;
	}
}