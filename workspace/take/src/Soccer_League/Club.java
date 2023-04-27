package Soccer_League;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

import com.sun.xml.internal.txw2.annotation.XmlAttribute;

@Entity
@XmlRootElement
public class Club implements Serializable{
	int id;
	String name;
	String country;
	Date foundationDate;
	String trainer;

	
	@Id
	@GeneratedValue
	@XmlAttribute
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public Date setFoundationDate () {
		return foundationDate;
	}
	public void setFoundationDate (Date foundationDate) {
		this. foundationDate = foundationDate;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public void setId(int id) {
		this.id = id;
	}
}

