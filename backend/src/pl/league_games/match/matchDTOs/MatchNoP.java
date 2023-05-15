package pl.league_games.match.matchDTOs;

import java.sql.Date;

import pl.league_games.club.Club;

public class MatchNoP {
	int id;
	Date matchDate;
	String score;
	int homeClubID;
	int awayClubID;
	public MatchNoP(int id, Date matchDate, String score, Club homeClub, Club awayClub){
		this.id = id;
		this.matchDate = matchDate;
		this.score = score;
		this.homeClubID = homeClub.getId();
		this.awayClubID = awayClub.getId();
	}
	public int getId(){
		return id;
	}
	public Date getMatchDate(){
		return matchDate;
	}
	public String getScore(){
		return score;
	}
	public int getHomeClubID(){
		return homeClubID;
	}
	public int getAwayClubID(){
		return awayClubID;
	}
}
