package pl.league_games.club;

import pl.league_games.club.clubDTOs.ClubDTO;
import pl.league_games.club.clubDTOs.CreateClubDTO;
import pl.league_games.club.clubDTOs.UpdateClubDTO;

public class ClubMapper {
	public ClubDTO ClubToDto(Club club){
		ClubDTO dto = new ClubDTO(club.getId(), club.getName(), club.getCountry(), 
				club.getFoundationDate(), club.getTrainer(), club.getPlayers(), club.getHomeMatches(), club.getAwayMatches(), club.getGoals());
		
		return dto;
	}
	public Club UpdateDtoToClub(UpdateClubDTO updatedClubDTO, Club currentClub ){
		Club updatedClub = new Club();
		
		updatedClub.setId(currentClub.getId());
		updatedClub.setPlayers(currentClub.getPlayers());
		updatedClub.setAwayMatches(currentClub.getAwayMatches());
		updatedClub.setHomeMatches(currentClub.getHomeMatches());
		updatedClub.setGoals(currentClub.getGoals());
		
		if (updatedClubDTO.getName() != null)
			updatedClub.setName(updatedClubDTO.getName());
		else
			updatedClub.setName(currentClub.getName());
		
		if (updatedClubDTO.getCountry() != null)
			updatedClub.setCountry(updatedClubDTO.getCountry());
		else
			updatedClub.setCountry(currentClub.getCountry());
		
		if (updatedClubDTO.getFoundationDate() != null)
			updatedClub.setFoundationDate(updatedClubDTO.getFoundationDate());
		else
			updatedClub.setFoundationDate(currentClub.getFoundationDate());
		
		if (updatedClubDTO.getTrainer() != null)
			updatedClub.setTrainer(updatedClubDTO.getTrainer());
		else
			updatedClub.setTrainer(currentClub.getTrainer());
			
		return updatedClub;
	}
	public Club CreateDtoToClub(CreateClubDTO newClubDTO){
		Club newClub = new Club();
		
		newClub.setName(newClubDTO.getName());
		newClub.setCountry(newClubDTO.getCountry());
		newClub.setFoundationDate(newClubDTO.getFoundationDate());
		newClub.setTrainer(newClubDTO.getTrainer());
		
		return newClub;
	}
}
