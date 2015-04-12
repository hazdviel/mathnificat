using UnityEngine;
using System.Collections;

public class HighscoreSceneScript : MonoBehaviour {
	public Transform[] texts;
	
	// Use this for initialization
	void Start () {
		
		string[] pName = new string[6];
		int[] pScore = new int[6];
		
		for (int n = 0; n < 6; n++){
			pName[n] = PlayerPrefs.GetString("playerName"+n);
			pScore[n] = PlayerPrefs.GetInt("playerScore"+n);
		}
		
		print(pScore[0]+" "+pScore[1]+" "+pScore[2]+" "+pScore[3]+" "+pScore[4]+" "+pScore[5]);
		
		for (int i = 0; i < texts.Length; i++) {
			tk2dTextMesh test = texts[i].GetComponent<tk2dTextMesh>();
			string name = PlayerPrefs.GetString("playerName"+i);
			int score = PlayerPrefs.GetInt("playerScore"+i);
			test.text = name+"\t\t\t\t\t\t\t\t"+score;
			//Debug.Log(PlayerPrefs.GetString("playerName"+i)+"\t"+PlayerPrefs.GetInt("playerScore"+i));
		}
	}
	
	void BackToMenu() {
		Application.LoadLevel("MainMenu");
	}

}
