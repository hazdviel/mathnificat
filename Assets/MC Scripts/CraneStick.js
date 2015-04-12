#pragma strict

//var stick : GameObject;
/*
var ax : float;
var ay : float;
var w : float;
var h : float;
var mx : float;
var my : float;
var px : float;
*/
var posx : float;
var cam : Camera;
var hit : RaycastHit2D;

var dragging : boolean;

function Start () {
	dragging = false;
}

function Update () {
	
	if (Input.GetMouseButton(0)){
			
			hit = Physics2D.Raycast(cam.ScreenToWorldPoint(Input.mousePosition), Vector2.zero);
			if(hit.collider != null){
				switch (hit.transform.name){
					case "controller_stick":
						//if (hit.transform.position.x > 0.5 && hit.transform.position.x < 0.5)
							dragging = true;
							//transform.localPosition.x = (Input.mousePosition.x/90f)-0.65;
					break;
				}
			}
			
			if (dragging) {
				transform.localPosition.x = (Input.mousePosition.x/90f)-0.65;
				
				if (transform.localPosition.x > 0.5) transform.localPosition.x = 0.5; 
				else
				if (transform.localPosition.x < -0.5) transform.localPosition.x = -0.5;
			}
	} 
	if (Input.GetMouseButtonUp(0)){
		transform.localPosition.x = 0;
		dragging = false;
	}
	
	//if (posx > 0.5 || posx < 0.5) 
	posx = transform.localPosition.x;
	
	/*
	var count = Input.touchCount;
	Debug.Log(count);
	
	if (count > 0){
		var touch : Touch = Input.GetTouch(0);
		Debug.Log(touch.position.x);
		Debug.Log(touch.position.y);
	}
	*/
	/*
	mx = Input.mousePosition.x;
	my = Input.mousePosition.y;
	
		if (Input.GetMouseButton(0) && (mx > ax && mx < ax+w && my > ay && my < ay+h)){
			if (mx > ax+w) mx = w;
			px = mx/30 - 10.2;
		}else
			px = -7.7;
		
		if (Input.GetKey(KeyCode.A))
			px = -9.7;
		else
		if (Input.GetKey(KeyCode.D))
			px = -5.7;
		
	
	transform.position.x = px;
	posx = px+7.7;
	*/
	
	//posx = transform.position.x;
}