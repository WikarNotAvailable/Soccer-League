package pl.league_games.player;
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

import pl.league_games.player.playerDTOs.CreatePlayerDTO;
import pl.league_games.player.playerDTOs.PlayerDTO;
import pl.league_games.player.playerDTOs.UpdatePlayerDTO;


@Path(value="Players")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PlayerREST implements IPlayerREST {

	@EJB
	PlayerEJB bean;
	PlayerMapper mapper = new PlayerMapper();

	@Override
	@POST
	public PlayerDTO create(CreatePlayerDTO newPlayerDTO, @QueryParam("clubID") int clubID) {
		Player newPlayer = mapper.CreateDtoToPlayer(newPlayerDTO);
		bean.create(newPlayer, clubID);
		
		Player player = bean.find(newPlayer.getId());
		PlayerDTO playerDTO = mapper.PlayerToDto(player);
		return playerDTO; 
	}

	@Override
	@GET
	@Path("/{playerID}")
	public PlayerDTO find(@PathParam("playerID") int playerID) {
		Player player = bean.find(playerID);
		
		PlayerDTO playerDTO = mapper.PlayerToDto(player);
		return playerDTO;
	}

	@Override
	@GET
	public Players get() {
		List<Player> lplayers = bean.get();
		List<PlayerDTO> playersDTO = new ArrayList<PlayerDTO>();
		
		for(Player p : lplayers){
			playersDTO.add(mapper.PlayerToDto(p));
		}
		
		Players players = new Players(playersDTO);
		return players; 
	}

	@Override
	@PUT
	public String update(UpdatePlayerDTO updatedPlayerDto, @QueryParam("clubID") int clubID) {
		try {
			Player currentPlayer = bean.find(updatedPlayerDto.getId());
			Player updatedPlayer = mapper.UpdateDtoToPlayer(updatedPlayerDto, currentPlayer);
			bean.update(updatedPlayer, clubID);
					
			return "Player updated";
		} catch (Exception e) {
			e.printStackTrace();
			return "Player not updated, error happened";
		}
	}

	@Override
	@DELETE
	@Path("/{playerID}")
	public String delete(@PathParam("playerID") int playerID) {
		try{
			bean.delete(playerID);
			return "Player deleted";
		} catch (Exception e){
			e.printStackTrace();
			return "Player not deleted";
		}	
	}
}

