package pl.league_games.player;

import pl.league_games.player.playerDTOs.CreatePlayerDTO;
import pl.league_games.player.playerDTOs.PlayerDTO;
import pl.league_games.player.playerDTOs.UpdatePlayerDTO;

public class PlayerMapper {
	public PlayerDTO PlayerToDto(Player player){
		PlayerDTO dto = new PlayerDTO(player.getId(), player.getFirstName(), player.getSurname(), 
				player.getDateOfBirth(), player.getNationality(), player.getPosition(), player.getClub().getId(), player.getMatches(), player.getGoals()); 
		
		return dto;
	}
	public Player UpdateDtoToPlayer(UpdatePlayerDTO updatedPlayerDTO, Player currentPlayer ){
		Player updatedPlayer = new Player();
		
		updatedPlayer.setId(currentPlayer.getId());
		updatedPlayer.setMatches(currentPlayer.getMatches());
		updatedPlayer.setGoals(currentPlayer.getGoals());
		
		if (updatedPlayerDTO.getFirstName() != null)
			updatedPlayer.setFirstName(updatedPlayerDTO.getFirstName());
		else
			updatedPlayer.setFirstName(currentPlayer.getFirstName());
		
		if(updatedPlayerDTO.getDateOfBirth() != null)
			updatedPlayer.setDateOfBirth(updatedPlayerDTO.getDateOfBirth());
		else
			updatedPlayer.setDateOfBirth(currentPlayer.getDateOfBirth());
		
		if(updatedPlayerDTO.getNationality() != null)
			updatedPlayer.setNationality(updatedPlayerDTO.getNationality());
		else
			updatedPlayer.setNationality(currentPlayer.getNationality());
		
		if(updatedPlayerDTO.getPosition() != null)
			updatedPlayer.setPosition(updatedPlayerDTO.getPosition());
		else
			updatedPlayer.setPosition(currentPlayer.getPosition());
		
		if(updatedPlayerDTO.getSurname() != null)
			updatedPlayer.setSurname(updatedPlayerDTO.getSurname());
		else
			updatedPlayer.setSurname(currentPlayer.getSurname());
		
		return updatedPlayer;
	}
	public Player CreateDtoToPlayer(CreatePlayerDTO newPlayerDTO){
		Player newPlayer = new Player();
		
		newPlayer.setFirstName(newPlayerDTO.getFirstName());
		newPlayer.setDateOfBirth(newPlayerDTO.getDateOfBirth());
		newPlayer.setNationality(newPlayerDTO.getNationality());
		newPlayer.setPosition(newPlayerDTO.getPosition());
		newPlayer.setSurname(newPlayerDTO.getSurname());
		
		return newPlayer;
	}
}
