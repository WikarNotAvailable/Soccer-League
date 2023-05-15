package pl.league_games.player.playerDTOs;

import java.sql.Date;

public class UpdatePlayerDTO {
	private int id;
	private String firstName;
	private String surname;
	private Date dateOfBirth;
	private String nationality;
	private String position;

	public UpdatePlayerDTO(){}
	public UpdatePlayerDTO(int id, String firstName, String surname, Date dateOfBirth, String nationality, String position){
		this.id = id;
		this.firstName = firstName;
		this.surname = surname;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.position = position;
	}
	public void setId(int id){
		this.id = id;
	}
	public int getId() {
		return id;
	}
	public void setFirstName(String firstName){
		this.firstName = firstName;
	}
	public String getFirstName()
	{
		return firstName;
	}
	public void setSurname(String surname){
		this.surname = surname;
	}
	public String getSurname()
	{
		return surname;
	}
	public void setDateOfBirth(Date dateOfBirth){
		this.dateOfBirth = dateOfBirth;
	}
	public Date getDateOfBirth()
	{
		return dateOfBirth;
	}
	public void setNationality(String nationality){
		this.nationality = nationality;
	}
	public String getNationality()
	{
		return nationality;
	}
	public void setPosition(String position){
		this.position = position;
	}
	public String getPosition()
	{
		return position;
	}
}
