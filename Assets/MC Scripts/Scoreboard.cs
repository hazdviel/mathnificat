using UnityEngine;
using System.Collections;
using System;

[System.Serializable]
public class PlayerData {
	private string _name;
	private int _score;
	
	public string Name {get; set;}
	public int Score {get; set;}
}

public class Scoreboard : MonoBehaviour {
	
	public static int someNumber = 123123;
	
	private static PlayerData[] pd;
	
	
	void Awake() {
		//DontDestroyOnLoad(transform.gameObject);
	}
	
	// Use this for initialization
	void Start () {
		//PlayerPrefs.DeleteAll();
		pd = new PlayerData[6];
		
		for (int i = 0; i < pd.Length; i++ ) {
			
			//initialize each playerdata
			pd[i] = new PlayerData();
			
			//check if scoreboard isnt null
			if (PlayerPrefs.GetString("playerName"+i) != null) {
				pd[i].Name = PlayerPrefs.GetString("playerName"+i);
				pd[i].Score = PlayerPrefs.GetInt("playerScore"+i);
				
				//Debug.Log("scoreboard isn't null...");
				Debug.Log("name: "+pd[i].Name+" score:"+pd[i].Score);
			}
			else {
				pd[i].Name = "Nyan";
				pd[i].Score = 0;
				PlayerPrefs.SetString("playerName"+i, pd[i].Name );
				PlayerPrefs.GetInt("playerScore"+i, pd[i].Score );				
			}
		}
				
		//-------------test area------------------
		/*addScore("Nunu", 30);
		addScore("Nuuu", 67);
		addScore("Unun", 19);
		addScore("Uuun", 20);	*/	
		
		saveToPlayerPref();
		//---------end of test area---------------
				
	}
	
 	public static void addScore(string name, int score) {
		pd[5].Name = name;
		pd[5].Score = score;
		
		//bubble sort
		int length = pd.Length;
		PlayerData temp = new PlayerData();
		for (int i = length -1 ; i > 0; i--) {
			for (int j = 0; j <= i-1; j++) {
				if (pd[j].Score < pd[j+1].Score) {
					temp = pd[j];
					pd[j] = pd[j+1];
					pd[j+1] = temp;
					
				}
			}
		}
		
		/*for (int n = 0; n < length; n++) {
			Debug.Log(pd[n].Score);
		}
		Debug.Log("-------------------");
		*/
	}
	
	private void saveToPlayerPref() {
		for (int i = 0; i < pd.Length; i++) {
			PlayerPrefs.SetString("playerName"+i, pd[i].Name);
			PlayerPrefs.SetInt("playerScore"+i, pd[i].Score);
		}
		PlayerPrefs.Save();
	}
}
