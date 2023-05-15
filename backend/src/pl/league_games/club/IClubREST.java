package pl.league_games.club;

import javax.ejb.Local;

import pl.league_games.club.clubDTOs.ClubDTO;
import pl.league_games.club.clubDTOs.CreateClubDTO;
import pl.league_games.club.clubDTOs.UpdateClubDTO;

@Local
public interface IClubREST {
	public abstract ClubDTO create(CreateClubDTO newClubDTO);

	public abstract ClubDTO find(int clubID);

	public abstract Clubs get();

	public abstract String update(UpdateClubDTO club);

	public abstract String delete(int clubID);
}
