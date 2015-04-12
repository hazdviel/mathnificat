#pragma strict

var comic1 : GameObject;
var comic2 : GameObject;
var comic3 : GameObject;
var comic4 : GameObject;

function Start () {

}

function Update () {

}

function Next(){
	if (comic1.active == true) comic1.active = false; else
	if (comic2.active == true) comic2.active = false; else
	if (comic3.active == true) comic3.active = false; else
	if (comic4.active == true) Skip();
}

function Skip(){
	Application.LoadLevel("GameScene");
}