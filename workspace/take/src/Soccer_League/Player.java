package Soccer_League;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Player implements Serializable {
	int id;
	String firstName;
	String surname;
	Club club;
	Date dateOfBirth;
	String nationality;
	String position;
	
	@Id
	@GeneratedValue
	@XmlAttribute
	public int getId() {
		return id;
	}
	
	public String getFirstName()
	{
		return firstName;
	}
	public void setFirstName(String firstName)
	{
		this.firstName=firstName;
	}
	public String getSurname()
	{
		return surname;
	}
	public void setSurname(String surname)
	{
		this.surname=surname;
	}
	public Date getDateOfBirth()
	{
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth)
	{
		this.dateOfBirth=dateOfBirth;
	}
	public String getNationality()
	{
		return nationality;
	}
	public void setNationality(String nationality)
	{
		this.nationality=nationality;
	}
	public String getPosition()
	{
		return position;
	}
	public void setPosition(String position)
	{
		this.position=position;
	}
	@ManyToOne
	public Club getClub()
	{
		return club;
	}
	public void setClub(Club club)
	{
		this.club=club;
	}
	public void setId(int id) {
		this.id = id;
	}
}
