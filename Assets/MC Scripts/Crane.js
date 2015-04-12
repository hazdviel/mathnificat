#pragma strict

//todo
//animating nyan
var paused : boolean;

enum states{move, moveDown, moveUp, stop}
var grabObj : boolean;
var state : states;
var face : GameObject[];

var craneStick : GameObject;
var stick : CraneStick;

//var gc : GameObject;
var gcs : GameScript;

var moveRLRange : float = 12;
var moveUDRange : float = 30;
var speed : float = 0.2;

private var hitObj : GameObject;
private var hit : RaycastHit2D;


function Start () {
	//gcs = gc.GetComponent('GameScript');
	
	paused = false;
	
	state = states.move;

	animation.wrapMode = WrapMode.Once;
	
	stick = craneStick.GetComponent('CraneStick');
	UpdateWajah(1);
}

function Update () {

if (!paused){

	UpdateControl();

	
	/*
	if (!grabObj &&
		state != states.moveDown &&
		state != states.moveUp   &&
		state != states.   &&
		state != states.stop   &&
	  	Input.GetButtonUp("Fire1")) //Grab();
	*/	

	if (grabObj){
		if (hitObj){
			hitObj.transform.position.x = transform.position.x;
			hitObj.transform.position.y = transform.position.y-0.3;
			
		}
		//if (Input.GetButtonUp("Fire1")) Release();
		//if (transform.position.x >= moveRLRange) Release();
	}
	
}
}

function UpdateControl(){
if (!paused){
	
	if (state == states.move) Move();
	/*
	if (stick.posx < -1) state = states.move;
	else
	if (stick.posx > 1) state = states.move;
	*/
	if (Input.GetKeyUp(KeyCode.Space) && state != states.moveUp && state != states.moveDown ){
		if (!grabObj){
			Grab();
		}else
			Release();
	}

}
}

function OnGrabBtn(){
if (!paused){

	if (!grabObj &&
		state != states.moveDown &&
		state != states.moveUp)
			Grab();
	else
	if (grabObj && (state == states.move || 
		state == states.move))
		Release();
		
}
}

function Grab(){
if (!paused){

	state = states.moveDown;
	animation.Play('Down');
	var movement = moveUDRange;
	
	//move crane down while detecting for objects
	while (state == states.moveDown && !paused){
		transform.Translate(0,-speed,0);
		yield WaitForSeconds(0.001 * Time.deltaTime);
		
		//detect object
		hit = Physics2D.Raycast (transform.position, Vector2(0,-1), 0);
		//if (Physics2D.Raycast (transform.position, Vector2(0,-1), hit, 1)){
		Debug.DrawRay( transform.position, Vector2(0,-1), Color.red, 0f);
		if (hit.collider != null){
			
			if (hit.collider.gameObject.tag == 'Item' && !grabObj){
				
				animation.Play('Grab');
				yield WaitForSeconds(0.1);
				
				hitObj = hit.collider.gameObject;
				grabObj = true;
				state = states.moveUp;
			}
		}
		
		movement -= speed;
		
		if (grabObj) break;
		if (movement <= 0) state = states.moveUp;
	}
	
	//move crane up
	while (state == states.moveUp && !paused){
		transform.Translate(0,speed,0);
		yield WaitForSeconds(0.001 * Time.deltaTime);
		movement += speed;
		if (movement >= moveUDRange) { 
			if (grabObj) {
				///////////////this is how our cat wins!! (or lose)
				var s : ScriptItem = hitObj.GetComponent('ScriptItem');
				gcs.UpdateAns( s );
				//////////////////////////////////////
			}
			//Release();
			state = states.move;
		}
	}
	
	if (!grabObj) animation.Play('Grab');
	
}
}

function UpdateWajah(w : int){
if (!paused){

	face[0].renderer.enabled = false;
	face[1].renderer.enabled = false;
	face[2].renderer.enabled = false;

	switch (w){
		case 1: //wajah normal
			face[0].renderer.enabled = true;
			break;
		case 2: //wajah ngambek
			face[1].renderer.enabled = true;
			break;
		case 3: //wajah happy
			face[2].renderer.enabled = true;
			break;
	}
	
}
}

function Release(){
if (!paused){

	grabObj = false;
	//hitObj = null;
	//animation.Play('Release');
	//
	animation.Play('Release');
	state = states.move;
	
	//yield WaitForSeconds(0.75);
	UpdateWajah(1);
	
}
}

function Release1(){
if (!paused){

	grabObj = false;
	
	state = states.move;
	
	//yield WaitForSeconds(1);
	UpdateWajah(1);
}
}


function Move(){
if (!paused){

	//transform.Translate(stick.posx/10,0,0);
	var nextx = transform.position.x + stick.posx * Time.deltaTime * 70 * speed;
	
	if (nextx < -moveRLRange) nextx = transform.position.x;
	if (nextx > moveRLRange) nextx = transform.position.x;
	
	if (state == states.move && !(transform.position.x < -moveRLRange) ) 
		//transform.Translate(nextx,0,0);
		//transform.Translate(-speed,0,0);
		transform.position.x = nextx;
	else
	if (state == states.move && !(transform.position.x > moveRLRange) )
		transform.Translate(nextx,0,0);
		transform.position.x = nextx;
		//transform.Translate(speed,0,0);
	
	//if (transform.position.x >= moveRLRange) state = states.move;
	//if (transform.position.x <= -moveRLRange) state = states.move;
}
}

