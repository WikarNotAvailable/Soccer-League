package pl.league_games.player;

import java.util.ArrayList;
import java.util.List;

import pl.league_games.player.playerDTOs.PlayerDTO;

public class Players {
	private List<PlayerDTO> players = new ArrayList<PlayerDTO>();

	public Players(List<PlayerDTO> players) {
		super();
		this.players = players;
	}

	public Players() {}
	
	public List<PlayerDTO> getPlayers() {
		return players;
	}

	public void setPlayers(List<PlayerDTO> players) {
		this.players = players;
	}
	
	
	
}