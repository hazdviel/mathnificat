#pragma strict

var spriteAngka : GameObject;
var itemType : int;
var angka : int = 991;
//var spark : GameObject;

//private var textAngka : tk2dTextMesh;

function Start () {
	//angka = 999;

	//yield WaitForSeconds(5);
	//Poof();
}

function Update () {

}
/*
function UpdateAngka(n : int){
	textMesh.text = n.ToString();
	textMesh.Commit();
}*/

function Poof(){
//	var cloneSpark : GameObject = Instantiate(spark, transform.position, transform.rotation);
	
	Destroy(gameObject);
}