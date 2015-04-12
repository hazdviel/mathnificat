#pragma strict

var spriteAngka : GameObject;
var angka : int;
//var spark : GameObject;

//private var textAngka : tk2dTextMesh;

function Start () {
	
	var spawnPos : Transform = transform;
	spawnPos.Translate(0, 0, -1);
	
	//var clone : GameObject = Instantiate(spriteAngka, spawnPos.position, transform.rotation);
	//clone.transform.parent = transform;
	//textAngka = clone.GetComponent(tk2dTextMesh);
	
	//clone.GetComponent(tk2dTextMesh).text = angka.ToString();
	//clone.GetComponent(tk2dTextMesh).Commit();
	if (angka < 990)
		spriteAngka.GetComponent(tk2dTextMesh).text = angka.ToString();
	//spriteAngka.GetComponent(tk2dTextMesh).Commit();
	
	//UpdateAngka( angka );
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