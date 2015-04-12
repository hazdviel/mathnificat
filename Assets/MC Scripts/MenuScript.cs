using UnityEngine;
using System.Collections;

public class MenuScript : MonoBehaviour {
	
	public Camera camera;
	
	private Ray ray;
	private RaycastHit hit;
	
	public tk2dTextMesh scoreText;
	
	// Use this for initialization
	void Start () {
		scoreText.text = PlayerPrefs.GetInt("Score").ToString();
	}
	
	// Update is called once per frame
	void Update () {
	
		//check touch input
		if (Input.GetMouseButtonDown(0)) {
			ray = camera.ScreenPointToRay(Input.mousePosition);
			
			if (Physics.Raycast(ray, out hit)) {
				
				if (hit.collider != null) {
					
					//iTween.PunchPosition(hit.transform.gameObject, new Vector3(1,0,0), 1.0f);
					//Debug.Log(btn);
					switch (hit.transform.name) {
						case "Btn_01_Play" : 
							Debug.Log("Goto scene Gameplay");
							LoadingScreen.show();
						
							Application.LoadLevel("Story");
						
							break;	
						case "Btn_02_Option" : 
							Debug.Log("Goto scene Option");
							Application.LoadLevel("Highscore");
							break;	
						case "Btn_03_About" : 
							Debug.Log("Goto scene About");
							//Application.LoadLevel(5);
							Quit();
							break;	
					}					
				}
			}
		}
	}
	
	void Quit(){
		Application.Quit();
	}
}
