package pl.league_games.player;

import javax.ejb.Local;

import pl.league_games.player.playerDTOs.CreatePlayerDTO;
import pl.league_games.player.playerDTOs.PlayerDTO;
import pl.league_games.player.playerDTOs.UpdatePlayerDTO;

@Local
public interface IPlayerREST {
	public abstract PlayerDTO create(CreatePlayerDTO newPlayerDTO, int clubID);

	public abstract PlayerDTO find(int playerID);

	public abstract Players get();

	public abstract String update(UpdatePlayerDTO updatedPlayerDTO, int clubID);

	public abstract String delete(int playerID);
}
