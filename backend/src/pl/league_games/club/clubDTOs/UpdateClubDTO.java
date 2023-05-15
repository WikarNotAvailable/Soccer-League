package pl.league_games.club.clubDTOs;

import java.sql.Date;

public class UpdateClubDTO {
	private int id;
	private String name;
	private String country;
	private Date foundationDate;
	private String trainer;
	
	public UpdateClubDTO(){}
	public UpdateClubDTO(int id,String name, String country, Date foundationDate, String trainer){
		this.id = id;
		this.name = name;
		this.country = country;
		this.foundationDate = foundationDate;
		this.trainer = trainer;
	}
	public int getId(){
		return id;
	}
	public void setId(int id){
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name){
		this.name = name;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country){
		this.country = country;
	}
	public Date getFoundationDate () {
		return foundationDate;
	}
	public void setFoundationDate(Date foundationDate){
		this.foundationDate = foundationDate;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer){
		this.trainer = trainer;
	}
}
