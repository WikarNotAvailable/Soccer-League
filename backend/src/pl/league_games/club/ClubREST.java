package pl.league_games.club;

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

import pl.league_games.club.clubDTOs.ClubDTO;
import pl.league_games.club.clubDTOs.CreateClubDTO;
import pl.league_games.club.clubDTOs.UpdateClubDTO;

@Path(value="Clubs")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class ClubREST implements IClubREST {

	@EJB
	ClubEJB bean;
	ClubMapper mapper = new ClubMapper();
	
	@Override
	@POST
	public ClubDTO create(CreateClubDTO newClubDTO) {
		Club newClub = mapper.CreateDtoToClub(newClubDTO);
		bean.create(newClub);

		ClubDTO clubDTO = mapper.ClubToDto(newClub);
		return clubDTO;
	}

	@Override
	@GET
	@Path("/{clubID}")
	public ClubDTO find(@PathParam("clubID") int clubID) {
		Club club = bean.find(clubID);
		ClubDTO clubDTO = mapper.ClubToDto(club);
		return clubDTO;
	}

	@Override
	@GET
	public Clubs get() {
		List<Club> lclubs = bean.get();
		List<ClubDTO> clubsDTO = new ArrayList<ClubDTO>();
		
		for(Club c : lclubs){
			clubsDTO.add(mapper.ClubToDto(c));
		}
		
		Clubs clubs = new Clubs(clubsDTO);
		return clubs; 
	}

	@Override
	@PUT
	public String update(UpdateClubDTO updatedClubDTO) {
		try {
			Club currentClub = bean.find(updatedClubDTO.getId());
			Club updatedClub = mapper.UpdateDtoToClub(updatedClubDTO, currentClub);
			bean.update(updatedClub);
			return "Club updated";
		} catch (Exception e) {
			e.printStackTrace();
			return "Club not updated, error happened";
		}
	}

	@Override
	@DELETE
	@Path("/{clubID}")
	public String delete(@PathParam("clubID") int clubID) {
		try {
			bean.delete(clubID);
			return "Club deleted";
		}
		catch(Exception e) {
			e.printStackTrace();
			return "Club not deleted";
		}
		
	}


}
