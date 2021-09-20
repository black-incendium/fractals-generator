let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
let canvas2 = document.querySelector(".canvas2");
let ctx2 = canvas2.getContext("2d");

canvas.style.transform = "scale(0.5)";
canvas2.style.transform = "scale(0.5)";

canvas.width = window.innerWidth*2;
canvas.height = window.innerHeight*2;
canvas2.width = window.innerWidth*2;
canvas2.height = window.innerHeight*2;

let vertexes = [[0,0],[0,0],[0,0]];
organizeVertexes();
let previouslyChosenVertexes = [0,0];

let point = [0, 0];
let jumpRatio = 0.5;

let vertexDraggingFlag = {
	value: false,
	vertex: 0
}

document.querySelector("body").style.setProperty("--first-color", "black");
document.querySelector("body").style.setProperty("--second-color", "white");

window.addEventListener("resize", function() {
	canvas.width = document.body.clientWidth*2;
	canvas.height = document.body.clientHeight*2;
	canvas2.width = document.body.clientWidth*2;
	canvas2.height = document.body.clientHeight*2;
	drawVertexes();
});

document.querySelector(".canvas").addEventListener("mousemove", function (e){
	if (vertexDraggingFlag.value) {
		vertexes[vertexDraggingFlag.vertex][0] = e.clientX*2;
		vertexes[vertexDraggingFlag.vertex][1] = e.clientY*2;
		drawVertexes()
	}
	for (let i=0; i<vertexes.length; i++) {
		if ((((e.pageX*2-vertexes[i][0])*(e.pageX*2-vertexes[i][0]))<=100)&&(((e.pageY*2-vertexes[i][1])*(e.pageY*2-vertexes[i][1]))<=100)) {
			canvas.style.cursor = "pointer"; 
			return;
		}
	}
		canvas.style.cursor = "default";
});

document.querySelector(".canvas").addEventListener("mousedown", function (e){
	for (let i=0; i<vertexes.length; i++) {
		if ((((e.pageX*2-vertexes[i][0])*(e.pageX*2-vertexes[i][0]))<=100)&&(((e.pageY*2-vertexes[i][1])*(e.pageY*2-vertexes[i][1]))<=100)) {
			vertexDraggingFlag.vertex = i;
			vertexDraggingFlag.value = true;
			return;
		}
	}	
});

document.querySelector(".canvas").addEventListener("mouseup", function (e){
	vertexDraggingFlag.value = false;
});

document.querySelector(".generate").addEventListener("click", function(){
	if (vertexes.length!=0) iterate(+document.querySelector(".iterationsNumber").value);
});

document.querySelector(".hideOptions").addEventListener("click", function(){
	if (document.querySelector(".hideOptions").innerText=="hide") {document.querySelector(".options").style.left = "-15em"; document.querySelector(".hideOptions").innerText="show"; return;}
	document.querySelector(".options").style.left = "1em"; document.querySelector(".hideOptions").innerText="hide";
});

document.querySelector(".clearCanvas").addEventListener("click", function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
});

document.querySelector(".clearVertexes").addEventListener("click", function(){
	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	vertexes = [];
});

document.querySelector(".addVertex").addEventListener("click", function(){
	vertexes.push([canvas.width/2, canvas.height/2]);
	drawVertexes();
});

document.querySelector(".moveVertexesCloser").addEventListener("click", function(){
	vertexes.forEach(function(e, index, array){
		array[index] = [e[0]*0.9+canvas.width*0.1*0.5, e[1]*0.9+canvas.height*0.1*0.5]
	});
	drawVertexes();
});

document.querySelector(".moveVertexesFurther").addEventListener("click", function(){
	vertexes.forEach(function(e, index, array){
		array[index] = [e[0]*1.1-canvas.width*0.1*0.5, e[1]*1.1-canvas.height*0.1*0.5]
	});
	drawVertexes();
});

document.querySelector(".organizeVertexes").addEventListener("click", organizeVertexes);

document.querySelector(".inverseColors").addEventListener("input", function(){
	if (document.querySelector(".inverseColors").checked) {
		document.querySelector("body").style.setProperty("--first-color", "white");
		document.querySelector("body").style.setProperty("--second-color", "black");
		return;
	}
	document.querySelector("body").style.setProperty("--first-color", "black");
	document.querySelector("body").style.setProperty("--second-color", "white");
	
});

document.querySelector(".predefinedOptions").addEventListener("input", function(){
	switch (document.querySelector(".predefinedOptions").value) {
		case "sierpinski#1": 
			vertexes = [[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = 0;
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "square#1": 
			vertexes = [[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "1";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "square#2": 
			vertexes = [[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "2";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "square#3": 
			vertexes = [[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "3";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "pentagon#1": 
			vertexes = [[0,0],[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "1";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "pentagon#2": 
			vertexes = [[0,0],[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "2";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "pentagon#3": 
			vertexes = [[0,0],[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 0;
			document.querySelector(".additionalRule").value = "3";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "pentagon#4": 
			vertexes = [[0,0],[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 180;
			document.querySelector(".additionalRule").value = "3";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		case "hexagon#1": 
			vertexes = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			organizeVertexes();
			document.querySelector(".rotateValue").value = 180;
			document.querySelector(".additionalRule").value = "3";
			document.querySelector(".additionalBehavior").value = 0;
			document.querySelector(".jumpRatio").value = 0.5;
		break;
		default: return; break;
	}
	document.querySelector(".rotateValueSpan").innerText = `rotate value: ${document.querySelector(".rotateValue").value}`;
	document.querySelector(".jumpRatioSpan").innerText = `jump ratio: ${document.querySelector(".jumpRatio").value}`;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	iterate(+document.querySelector(".iterationsNumber").value);
});

document.querySelector(".iterationsNumber").addEventListener("input", function(){
	document.querySelector(".iterationsNumberSpan").innerText = `iterations: ${document.querySelector(".iterationsNumber").value}`
});

document.querySelector(".additionalRule").addEventListener("input", function(){
	document.querySelector(".predefinedOptions").value = "none";
});

document.querySelector(".additionalBehavior").addEventListener("input", function(){
	document.querySelector(".predefinedOptions").value = "none";
});

document.querySelector(".rotateValue").addEventListener("input", function(){
	document.querySelector(".predefinedOptions").value = "none";
	document.querySelector(".rotateValueSpan").innerText = `rotate value: ${document.querySelector(".rotateValue").value}`
});

document.querySelector(".showVertexes").addEventListener("input", function(){
	if (document.querySelector(".showVertexes").checked) {drawVertexes(); return;}
	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
});

document.querySelector(".jumpRatio").addEventListener("input", function(){
	document.querySelector(".predefinedOptions").value = "none";
	document.querySelector(".jumpRatioSpan").innerText = `jump ratio: ${document.querySelector(".jumpRatio").value}`
	jumpRatio = +document.querySelector(".jumpRatio").value;
});

function iterate(n=1) {
	point = [vertexes[0][0],vertexes[0][1]];
	let rnd;
	jumpRatio = +document.querySelector(".jumpRatio").value;
	for (let i=4; i<n; i++) {
		do {rnd = Math.floor(Math.random()*vertexes.length);} while (doesItBreakRules(rnd));
		previouslyChosenVertexes.pop();
		previouslyChosenVertexes.unshift(rnd);
		ctx.fillStyle = document.querySelector("body").style.getPropertyValue("--second-color");
		point[0] = point[0]*(1-jumpRatio) + vertexes[rnd][0]*jumpRatio;
		point[1] = point[1]*(1-jumpRatio) + vertexes[rnd][1]*jumpRatio;
		point = applyAdditionalBehavior(point, rnd);
		ctx.fillRect(point[0], point[1], 1, 1);
	}
}

function doesItBreakRules(chosenVertex) {
	switch (+document.querySelector(".additionalRule").value) {
		case 0: return false; break;
		case 1: if ((chosenVertex==previouslyChosenVertexes[0])&&(vertexes.length>2)) return true; return false; break;
		case 2: 
			if (vertexes.length<4) return false;
			if (previouslyChosenVertexes[0]==previouslyChosenVertexes[1]) {
				if ((((chosenVertex-previouslyChosenVertexes[0]+vertexes.length)%vertexes.length)==1)||(((chosenVertex-previouslyChosenVertexes[0]+vertexes.length)%vertexes.length)==vertexes.length-1)) return true;
			}
			return false;
		break;
		case 3: 
			if (vertexes.length<4) return false;
			if ((((chosenVertex-previouslyChosenVertexes[0]+vertexes.length)%vertexes.length)==2)||(((chosenVertex-previouslyChosenVertexes[0]+vertexes.length)%vertexes.length)==vertexes.length-2)) return true;
			return false;
		break;
	}
}

function rotatePoint(point, origin, angle) {
	angle = angle*Math.PI/180
	return [
	Math.cos(angle)*(point[0]-origin[0])-Math.sin(angle)*(point[1]-origin[1])+origin[0],
	Math.cos(angle)*(point[1]-origin[1])+Math.sin(angle)*(point[0]-origin[0])+origin[1]
	];
}

function organizeVertexes() {
	ctx2.clearRect(0,0,canvas2.width,canvas2.height)
	let temporaryPoint;
	temporaryPoint = [canvas.width/2, 50];
	if (canvas.width<canvas.height) temporaryPoint = rotatePoint([20, canvas.height/2], [canvas.width/2,canvas.height/2], 90);
	let length = vertexes.length;
	vertexes = [];
	for (let i=0; i<length; i++) {
		vertexes.push(temporaryPoint);
		temporaryPoint = rotatePoint(temporaryPoint, [canvas.width/2,canvas.height/2], 360/length);
	}
	drawVertexes()
}

function drawVertexes() {
	ctx2.clearRect(0,0,canvas2.width,canvas2.height)
	vertexes.forEach(function(e, index, array) {
		ctx2.fillStyle = "red";
		ctx2.fillRect(e[0]-10,e[1]-10,20,20);
	});
}

function applyAdditionalBehavior(point, chosenVertexIndex) {
	switch (+document.querySelector(".additionalBehavior").value) {
		case 0: return rotatePoint(point, vertexes[chosenVertexIndex], +document.querySelector(".rotateValue").value); break;
		case 1: 
			if (chosenVertexIndex==0) return rotatePoint(point, vertexes[chosenVertexIndex], +document.querySelector(".rotateValue").value); 
			return point;
		break;
	}
}