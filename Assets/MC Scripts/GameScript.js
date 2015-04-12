#pragma strict

var paused : boolean;
var ended  : boolean;
var preparing : boolean;

var cam : Camera;
var hit : RaycastHit2D;

var item : GameObject;
var itemSprites : Sprite[];
var spawner : GameObject[];

var specialItem : GameObject;
var itemSlots : GameObject[];
var specialItems : Sprite[];
var textItem : GameObject[];
var itemCount : int[];

var stage : int;
var timeOut : float;
var questPerStage : int[];
var timeOutPerStage : int[];

var clock : GameObject;
var clockPies : GameObject[];
var p = 0;

//var items : GameObject[];
var angkaajaib = new Array();
var jmlSoal : int;
var curQuest : int;
var score : float;
var time : float;

var crane : Crane;

var spriteGameOver : GameObject;
var spritePaused : GameObject;
var spriteMew : GameObject;
var spriteComplete : GameObject;

var bumperStage : GameObject;
//var btnPause : GameObject;

//var scoreText : tk2dTextMesh;

var spriteQuest : GameObject;
private var spriteQuestText : tk2dTextMesh;
spriteQuestText = spriteQuest.GetComponent(tk2dTextMesh);

var spriteAns : GameObject;
private var spriteAnsText : tk2dTextMesh;
spriteAnsText = spriteAns.GetComponent(tk2dTextMesh);

var spriteScore : GameObject;
private var spriteScoreText : tk2dTextMesh;
spriteScoreText = spriteScore.GetComponent(tk2dTextMesh);



function Start () {
	spriteGameOver.SetActive(false);
	spritePaused.SetActive(false);
	//spriteMew.SetActive(false);
	spriteComplete.SetActive(false);

	//Time.timeScale = 1;
	//itemCount[0] = 0;

	paused = true;
	ended = false;
	//preparing = true;

	spriteMew.animation.Play("MewReadyGo");
	yield WaitForSeconds(5);
	paused = false;

	score = 0;
	curQuest = -1;
	
	UpdateStage();
	UpdateQuest();

	if (!PlayerPrefs.GetInt('Score')) PlayerPrefs.SetInt('Score', score);
	
	bumperStage.animation.Play("StageBumper");
	
	//preparing = false;
	
}

function Pause(){
	paused = true;
	
	spritePaused.SetActive(true);
	
	var physicObjects : GameObject[] = GameObject.FindGameObjectsWithTag('Item');
	for (var i=0; i<physicObjects.length; ++i){
		physicObjects[i].rigidbody2D.Sleep();
		//physicObjects[i].rigidbody2D.active = false;
	}
	
	clock.animation["Timer"].speed = 0;
	//btnPause.transform.position.z = -15;
	
	//Time.timeScale = 0;
}

function Resume(){
	paused = false;
	
	spritePaused.SetActive(false);
	spriteComplete.SetActive(false);
	
	var physicObjects : GameObject[] = GameObject.FindGameObjectsWithTag('Item');
	for (var i=0; i<physicObjects.length; ++i){
		physicObjects[i].rigidbody2D.WakeUp();
		//physicObjects[i].rigidbody2D.active = true;
	}
	
	//clock.animation.enabled = true;
	clock.animation["Timer"].speed = 12f/timeOutPerStage[stage-1];
	//btnPause.transform.position.z = 99;
}

function Update () {

	if (Input.GetMouseButtonUp(0)){
				
		hit = Physics2D.Raycast(cam.ScreenToWorldPoint(Input.mousePosition), Vector2.zero);
		if(hit.collider != null){
			switch (hit.transform.name){
				case "btnPause":
					Pause();
				break;
				case "btnResume":
					Resume();
					bumperStage.animation.Play("StageBumper");
				break;
				case "btnQuit":
					Application.LoadLevel("MainMenu");
				break;
				case "btnGiveup":
					LevelEnd();
				break;
				case "btnRetry":
					Application.LoadLevel("GameScene");
				break;
				case "btnBacktoMenu":
					Application.LoadLevel("MainMenu");
				break;
				case "btnGrab":
					if (!crane.grabObj && crane.state!=states.moveUp && crane.state!=states.moveDown) crane.Grab();
					else 
					if (crane.state==states.move)
						crane.Release();
				break;
				case "itemSlot1":
					if (itemCount[0] > 0) SpecialSkip();
				break;
				case "itemSlot2":
					if (itemCount[1] > 0) SpecialSpeed();
				break;
				case "itemSlot3":
					if (itemCount[2] > 0) SpecialHint();
				break;
			}
		}
	}

	if (!paused && !ended){
		
		timeOut -= Time.deltaTime;
		
		if (timeOut < 0) LevelEnd();
		
		//Updatebar();
	}
	else
	if (ended) crane.UpdateWajah(2);

}
///////TODO update stage
/// spawn here
function UpdateStage(){
	stage++;
	
	//renew array
	//angkaajaib = new Array();
	//curQuest = 0;
	
	//update stage banner
	bumperStage.GetComponent(tk2dTextMesh).text = "Stage "+stage;
	
	var a : int; var b : int; var c : int; 
	var op1 : int; var op2 :int;
	var result : float;
	var i : int;
	
	switch (stage){
		case 1:
			jmlSoal = questPerStage[0];
			for (i=0; i<jmlSoal; i++){
				op1 = Random.Range(1,2);
				
				do{
					a = Random.Range(1,9);	
					b = Random.Range(1,9);
					if (op1 == 1) result = a+b;
					else 		  result = a-b;
				}while(result < 0);
				
				if (op1 == 1) angkaajaib.push(new Array(a, "+", b, "=", result));
				else          angkaajaib.push(new Array(a, "-", b, "=", result));
				
				SpawnItems(result);
			}
			/*
			var sss = stage;
			while (sss == stage){
				yield WaitForSeconds(5);
				DropSpecialItems();
			}
			*/
			//timeOut = timeOutPerStage[0];
			
		break;
		case 2:
			bumperStage.animation.Play("StageBumper");
			//StageComplete();
			
			jmlSoal += questPerStage[1];
			for (i=curQuest; i<jmlSoal; i++){
				op1 = Random.Range(1,3);
				
				do{
					a = Random.Range(1,9);	
					b = Random.Range(1,9);
					if (op1 == 1) result = a+b;
					else
					if (op1 == 2) result = a-b;
					else 		  result = a*b;
				}while(result < 0 || result > 30);
				
				if (op1 == 1) angkaajaib.push(new Array(a, "+", b, "=", result));
				else
				if (op1 == 2) angkaajaib.push(new Array(a, "-", b, "=", result));
				else          angkaajaib.push(new Array(a, "*", b, "=", result));
				
				//StageComplete();
				
				SpawnItems(result);
			}
			StageComplete();
			//timeOut = timeOutPerStage[1];
			//totalQuest += questPerStage[1];
		break;
		case 3:
			bumperStage.animation.Play("StageBumper");
			//StageComplete();
			
			jmlSoal += questPerStage[1];
			for (i=curQuest; i<jmlSoal; i++){
				op1 = Random.Range(1,2);
				op2 = Random.Range(3,4);
				
				////////////
				do{
					a = Random.Range(1,9);	
					b = Random.Range(1,9);
					////
					if (op1 == 1) {
						result = a*b;
					}else
					if (op1 == 2){
					 	result = a/b;
					}
					
				}while(result < 0 || result > 300);
				
				/////////////
				do{
					c = Random.Range(1,9);
					////
					if (op2 == 3){
						result = result+b;
					}else result = result-b;
					
				}while(result < 0 || result > 30);
				
				if (op1 == 1){ 
					if (op2 == 3)
						angkaajaib.push(new Array(a, "*", b, "+", c, "=", result));
					else
						angkaajaib.push(new Array(a, "*", b, "-", c, "=", result));
				}else
				if (op1 == 2){
				 	if (op2 == 3)
						angkaajaib.push(new Array(a, "/", b, "+", c, "=", result));
					else
						angkaajaib.push(new Array(a, "/", b, "-", c, "=", result));
				}//else
				//if (op1 == 3) angkaajaib.push(new Array(a, "*", b, result));
				//else 		  angkaajaib.push(new Array(a, "/", b, result));
				
				//StageComplete();
				
				SpawnItems(result);
			}
			StageComplete();
			//timeOut = timeOutPerStage[1];
			//totalQuest += questPerStage[1];
		break;
	
	}
	
	//Resume();
	//UpdateQuest();
	//UpdateClock();
}

function ResetLevel(){
	Application.LoadLevel("GameScene");
}
/*
function AddQuests(){
	var a : int = Random.Range(1,9);
	var b : int = Random.Range(1,9);
	var c : int = a + b;

	var ajaib = new Array(a, '+', b, c);
	angkaajaib.Push(ajaib);

}
*/
function SpawnItems(number : int){
	if (paused || ended) return;
	//for (var i=0; i<angkaajaib.length; ++i){
	/*
		var arr : Array = angkaajaib[i];
		var a : int = arr[3];
	
		//yield WaitForSeconds(0.2);
		var b = i;
		if (b > 9) b-=9;
		item.GetComponent(SpriteRenderer).sprite = itemSprites[b];
		
		//var instPos = Vector3(spawnx, Random.Range(25, 40), 0);
	*/
		var b = number;
		while (b > 9) b-=9;
		item.GetComponent(SpriteRenderer).sprite = itemSprites[b];
		
		if (b > 5) b-=5;
	
		var cloneItem : GameObject = Instantiate(item, spawner[b].transform.position, transform.rotation);
		var s : ScriptItem = cloneItem.GetComponent('ScriptItem');
		s.angka = number;
	//}

}

function DropSpecialItems(){
	if (paused || ended) return;
	
	var r1 : int = Random.Range(0,2);
	
	specialItem.GetComponent(SpriteRenderer).sprite = specialItems[r1];
	
	var r2 = Random.Range(0,5);
	var cloneItem : GameObject = Instantiate(specialItem, spawner[r2].transform.position, transform.rotation);
	var s : ScriptItem = cloneItem.GetComponent('ScriptItem');
		s.angka = 990+r1;
}

function UpdateQuest(){
	if (paused || ended) return;
	//spriteQuestText.text = "";
	
	//yield WaitForSeconds(0.7);

	curQuest++;
	///check if there is no next quest in current stage
	//if (++curQuest >= questPerStage[stage-1]) UpdateStage();
	if (curQuest >= jmlSoal) {
		//StageComplete();
		UpdateStage();
	}
	
	var ar : Array = angkaajaib[curQuest];
	
	if (ar[3] == "="){
		var aa : int = ar[0];
		var ope1 : String = ar[1];
		var bb : int = ar[2];
		spriteQuestText.text = aa +" "+ ope1 +" "+ bb + " = ";
		//spriteQuestText.Commit();
	}else{
		var aaa : int = ar[0];
		var opee1 : String = ar[1];
		var bbb : int = ar[2];
		var opee2 : String = ar[3];
		var ccc : int = ar[4];
		spriteQuestText.text = aaa +" "+ opee1 +" "+ bbb +" "+ opee2 +" "+ ccc + " = ";
	}
	
	timeOut = timeOutPerStage[stage-1];
	UpdateClock();
}

function UpdateAns(s : ScriptItem){
	if (paused || ended) return;

	//if (angka < 0) return;

	var ansrr : Array = angkaajaib[curQuest];
	var ans : int;
	
	if (ansrr[3] != "=") ans = ansrr[6];
	else ans = ansrr[4];
	
	//DropSpecialItems();
	if (s.angka == ans){
		spriteAnsText.text = s.angka.ToString();
		//drop item if player fast enough to get answer
		if (timeOut > timeOutPerStage[stage-1]/2){
			var r : int = Random.Range(1,4);
			if (r == 3) DropSpecialItems();
			//DropSpecialItems();
		}
		
		//DropSpecialItems();
	
		spriteAnsText.color = Color.green;
		spriteQuestText.color = Color.green;
		
		FadeAns();
		
		s.Poof();
		
		UpdateQuest();
		//bar += 0.2; 
		
		UpdateScore(100 + 10*timeOut);
		
		//AddQuests();
		//SpawnItems(jmlSoal++);
		
		crane.UpdateWajah(3);
		crane.animation.Play('Happy');
		yield WaitForSeconds(0.5);
		crane.Release1();
		
	}else
	if (s.angka >= 990){
		//special item
		AddItemToSlot(s.angka-990);
		s.Poof();
		crane.UpdateWajah(3);
		crane.animation.Play('Happy');
		yield WaitForSeconds(0.5);
		crane.Release1();
	}else{
		spriteAnsText.text = s.angka.ToString();
		
		spriteAnsText.color = Color.red;
		spriteQuestText.color = Color.red;
		
		FadeAns();
		
		crane.UpdateWajah(2);
	}
}

function SpecialSkip(){
	SkipQuest();
	textItem[0].GetComponent(tk2dTextMesh).text = --itemCount[0]+"";
}

function SpecialSpeed(){
	textItem[1].GetComponent(tk2dTextMesh).text = --itemCount[1]+"";
	
	var prevSpeed = crane.speed;

	crane.speed = 0.3;
	yield WaitForSeconds(10);
	crane.speed = prevSpeed;
	
}

function SpecialHint(){

	textItem[2].GetComponent(tk2dTextMesh).text = --itemCount[2]+"";
}

function AddItemToSlot(id : int){
	
	textItem[id].GetComponent(tk2dTextMesh).text = ++itemCount[id]+"";
	
}

function FadeAns(){
	if (paused || ended) return;

	while ( spriteAnsText.color.a > 0){
		spriteAnsText.color.a -= 0.05;
		Debug.Log("trololol");
		yield WaitForSeconds(0.03);
		
	}
	
	spriteQuestText.color = Color.white;
	spriteAnsText.color = Color.white;
	spriteAnsText.text = "?";
	

}

function SkipQuest(){
	if (paused || ended) return;

	spriteAnsText.color = Color.red;
	spriteQuestText.color = Color.red;
		
	FadeAns();
	
	//AddQuests();
	//SpawnItems(angkaajaib.length-1);

	//curQuest++;
	UpdateQuest();
	//bar -= 0.3;
	

}

function UpdateScore(s : int){
	if (paused || ended) return;
	score += s;
	
	if (PlayerPrefs.GetInt('Score') < score)
		PlayerPrefs.SetInt('Score', score);
	
	spriteScoreText.text = score.ToString();
	
//	var cloneSpark : GameObject = Instantiate(spark, spark.transform.position, spark.transform.rotation);

}

function UpdateClock(){
	if (paused || ended) return;
	
	var t :float = timeOut;
	p = 0;
	
	clock.animation.Stop("Timer");
	for (var pie=0; pie<12; pie++) clockPies[pie].SetActive(true);
	clock.animation["Timer"].speed = 12f/timeOutPerStage[stage-1];
	clock.animation.Play("Timer");

	/*
	while (p <= 12){
		
		clockPies[p].SetActive(false);
		yield WaitForSeconds(t/12f);
		p++;
	}
	*/

}

function StageComplete(){
	//pause everything
	paused = true;
	var physicObjects : GameObject[] = GameObject.FindGameObjectsWithTag('Item');
	for (var i=0; i<physicObjects.length; ++i){
		physicObjects[i].rigidbody2D.Sleep();
		//physicObjects[i].rigidbody2D.active = false;
	}
	clock.animation["Timer"].speed = 0;

	/// gambling
	//
	
	///got the bonus

	///show up dialog
	spriteComplete.SetActive(true);
	
	///continue game..
	//bumperStage.animation.Play("StageBumper");
}

function LevelEnd(){
	paused = true;
	ended = true;
	
	spriteGameOver.SetActive(false);
	spritePaused.SetActive(false);
	spriteMew.SetActive(false);
	spriteComplete.SetActive(false);

	crane.UpdateWajah(2);
	crane.animation.Play('Release');
	//spriteGameOver.transform.position.z = -15;
	spriteGameOver.SetActive(true);
	//scoreText.text = score.ToString();
	
	var length:int = 6;
	var playerScore:Array = [];
	var playerName:Array = [];
	for (var i:int = 0; i < length; i++) {
		playerName[i] = PlayerPrefs.GetString("playerName"+i);
		playerScore[i] = PlayerPrefs.GetInt("playerScore"+i);
	}
	
	playerName[length-1] = "player";
	playerScore[length-1] = score;
	
	print(playerScore);
	
	var swapped:boolean = false;
	do {
		swapped = false;
		for (var n:int = 0; n < length - 1; n++) {
			var n1:int = playerScore[n];
			var n2:int = playerScore[n+1];
			if ( n1 < n2 ) {
				var temp_s:int = playerScore[n];
				playerScore[n] = playerScore[n+1];
				playerScore[n+1] = temp_s;
				
				var temp_n:String = playerName[n];
				playerName[n] = playerName[n+1];
				playerName[n+1] = temp_n;
				
				swapped = true;
			}
		}
	} while (swapped);
	
	print(playerScore);
	
	for (var save:int = 0; save < length; save++) {
		var pName:String = playerName[save];
		var pScore:int = playerScore[save];
		PlayerPrefs.SetString("playerName"+save, pName);
		PlayerPrefs.SetInt("playerScore"+save, pScore);
		PlayerPrefs.Save();
	}
}

function BacktoMainMenu(){
	Application.LoadLevel("MainMenu");
}