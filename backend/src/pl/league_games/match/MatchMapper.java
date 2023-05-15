package pl.league_games.match;

import java.util.ArrayList;

import pl.league_games.match.matchDTOs.CreateMatchDTO;
import pl.league_games.match.matchDTOs.MatchDTO;
import pl.league_games.match.matchDTOs.UpdateMatchDTO;
import pl.league_games.player.Player;

public class MatchMapper {

	public MatchDTO MatchToDto(Match match){
		MatchDTO dto = new MatchDTO(match.getId(), match.getMatchDate(), match.getScore(),
				match.getHomeClub().getId(), match.getAwayClub().getId(), match.getPlayers(), match.getGoals()); 
		
		return dto;
	}
	public Match UpdateDtoToMatch(UpdateMatchDTO updatedMatchDTO, Match currentMatch){
		Match updatedMatch = new Match();
		
		updatedMatch.setId(currentMatch.getId());
		updatedMatch.setPlayers(currentMatch.getPlayers());
		updatedMatch.setGoals(currentMatch.getGoals());

		if(updatedMatchDTO.getMatchDate() != null){
			updatedMatch.setMatchDate(updatedMatchDTO.getMatchDate());
		}
		else
			updatedMatch.setMatchDate(currentMatch.getMatchDate());
		
		if(updatedMatchDTO.getScore() != null){
			updatedMatch.setScore(updatedMatchDTO.getScore());
		}
		else
			updatedMatch.setScore(currentMatch.getScore());
		
		return updatedMatch;
	}
	public Match CreateDtoToMatch(CreateMatchDTO newMatchDTO){
		Match newMatch = new Match();
		newMatch.setMatchDate(newMatchDTO.getMatchDate());
		newMatch.setScore(newMatchDTO.getScore());
		newMatch.setPlayers(new ArrayList<Player>());
		
		return newMatch;
		
	}
}
