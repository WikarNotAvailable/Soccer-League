package pl.league_games.player.playerDTOs;

import java.sql.Date;

import pl.league_games.club.Club;

public class PlayerNoM {
	private int id;
	private String firstName;
	private String surname;
	private Date dateOfBirth;
	private String nationality;
	private String position;
	private int clubID;
	
	public PlayerNoM(int id, String firstName, String surname, Date dateOfBirth,
			String nationality, String position, Club club){
		this.id = id;
		this.firstName = firstName;
		this.surname = surname;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.position = position;
		this.clubID = club.getId();
	}
	public int getId() {
		return id;
	}
	public String getFirstName()
	{
		return firstName;
	}
	public String getSurname()
	{
		return surname;
	}
	public Date getDateOfBirth()
	{
		return dateOfBirth;
	}
	public String getNationality()
	{
		return nationality;
	}
	public String getPosition()
	{
		return position;
	}
	public int getClubID(){
		return clubID;
	}
}
