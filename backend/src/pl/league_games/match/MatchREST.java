package pl.league_games.match;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import pl.league_games.match.matchDTOs.CreateMatchDTO;
import pl.league_games.match.matchDTOs.MatchDTO;
import pl.league_games.match.matchDTOs.UpdateMatchDTO;

@Path(value="Matches")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class MatchREST implements IMatchREST {

	@EJB
	MatchEJB bean;
	MatchMapper mapper = new MatchMapper();
	
	@Override
	@POST
	public MatchDTO create(CreateMatchDTO newMatchDTO,@QueryParam("homeClubID") int homeClubID,@QueryParam("awayClubID") int awayClubID) {
		Match newMatch = mapper.CreateDtoToMatch(newMatchDTO);
		bean.create(newMatch, homeClubID, awayClubID, newMatchDTO.getPlayerIDs());
		
		Match match = bean.find(newMatch.getId());
		MatchDTO matchDTO = mapper.MatchToDto(match);
		return matchDTO;
	}

	@Override
	@GET
	@Path("/{matchID}")
	public MatchDTO find(@PathParam("matchID")int matchID) {
		Match match = bean.find(matchID);
		
		MatchDTO matchDTO = mapper.MatchToDto(match);
		return matchDTO;
	}

	@Override
	@GET
	public Matches get() {
		List<Match> lmatches = bean.get();
		List<MatchDTO> matchesDTO = new ArrayList<MatchDTO>();
		
		for(Match m : lmatches){
			matchesDTO.add(mapper.MatchToDto(m));
		}
		
		Matches matches = new Matches(matchesDTO);
		return matches;
	}

	@Override
	@PUT
	public String update(UpdateMatchDTO updatedMatchDTO, @QueryParam("homeClubID") int homeClubID, @QueryParam("awayClubID") int awayClubID) {
		try{
			Match currentMatch = bean.find(updatedMatchDTO.getId());
			Match updatedMatch = mapper.UpdateDtoToMatch(updatedMatchDTO, currentMatch);
			bean.update(updatedMatch, homeClubID, awayClubID, updatedMatchDTO.getPlayerIDs());
			
			return "Match updated!";
		}catch (Exception e){
			e.printStackTrace();
			return "Match not updated, error happened";
		}
	}

	@Override
	@DELETE
	@Path("/{matchID}")
	public String delete(@PathParam("matchID") int matchID) {
		try{
			bean.delete(matchID);
			return "Match deleted";
		}catch (Exception e){
			e.printStackTrace();
			return "Match not deleted";
		}
	}

}
