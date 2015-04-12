using UnityEngine;
using System.Collections;

public class EnabledSoundScript : MonoBehaviour {
	
	public Camera camera;
	
	private Ray ray;
	private RaycastHit hit;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		
		//check touch input
		if (Input.GetMouseButtonDown(0)) {
			ray = camera.ScreenPointToRay(Input.mousePosition);
			
			if (Physics.Raycast(ray, out hit)) {
				
				if (hit.collider != null) {
					
					//Debug.Log(btn);
					switch (hit.transform.name) {
						case "Btn_01_Yes" : 
							ASSETS.SOUND = 1;
							//add some click animation
							iTween.PunchPosition(hit.transform.gameObject, new Vector3(1,0,0), 1.0f);
							//change scene
							StartCoroutine(waitBeforeNextScene());
							break;	
							
						case "Btn_02_No" : 
							ASSETS.SOUND = 0;
							//add some click animation
							iTween.PunchPosition(hit.transform.gameObject, new Vector3(1,0,0), 1.0f);
							//change scene
							StartCoroutine(waitBeforeNextScene());
							break;
					}					
				}
			}
		}
		
	}
	
 	IEnumerator waitBeforeNextScene(){
		yield return new WaitForSeconds(0.5f);
		Application.LoadLevel(1);
	} 
}
