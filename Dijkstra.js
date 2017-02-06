var Dijkstra = function(distances, firstNode, showRoot) {
	

	/*---------------------------Constructor call validation----------------------------*/
	if (arguments.length > 3 || arguments.length < 2)
	{
		console.log("Constructor can take only 2 or 3 parameters!");
		return -1;
	}
	if (!(distances instanceof Array)) {
		console.log("The first parameter must be an Array!");
		return -1;
	}
	if (isNaN(firstNode)) {
		console.log("node's number must be a number!");
		return -1;
	}

	var arrayLength = distances.length;

	if (firstNode < 0 || firstNode >= arrayLength) {
		console.log("The number of first node shouldn't exceed the number of all nodes!");
		return -1;
	}
	for (var i = 0; i < arrayLength; i++)
	{
		if (distances[i].length != arrayLength)
		{
			console.log("Matrix bust be square!");
			return -1;
		}
	}
	/*----------------------------------------------------------------------------------*/


	this.usedNode = new Array(arrayLength); //Visited nodes
	var optimizedDistances = new Array(arrayLength); //The length of shortest path

	
	for (i = 0; i < arrayLength; i++)
	{
		optimizedDistances[i] = Number.POSITIVE_INFINITY;
		this.usedNode[i] = 0; //0 - not visited, 1 - visited node
	}
	this.usedNode[firstNode] = 1;
	optimizedDistances[firstNode] = 0;
	var currentNode = firstNode; //set the current node

	var step = 0;

	if (!showRoot) { //if we dont need to see the trace

		while (step < arrayLength) {
			for (i = 0; i < arrayLength; i++)
			{	
				if (this.usedNode[i] === 0) //dont touch visited nodes
				{
					optimizedDistances[i] = Math.min(optimizedDistances[i], (optimizedDistances[currentNode] + distances[currentNode][i]));
				}
			}
			
			currentNode = this.minElementIndex(optimizedDistances); //Set new current node	
			this.usedNode[currentNode] = 1; //mark the node as visited
			step++;
		}
		return optimizedDistances;
	}

	else { //if we want to see the trace
		
		var trace = new Array(arrayLength); 
		trace[currentNode] = currentNode;

		while (step < arrayLength) {
			for (i = 0; i < arrayLength; i++)
			{
				if (this.usedNode[i] === 0) //dont touch visited nodes
				{
					if (optimizedDistances[i] > optimizedDistances[currentNode] + distances[currentNode][i]) {
						optimizedDistances[i] = optimizedDistances[currentNode] + distances[currentNode][i];
						trace[i] = trace[currentNode];
						trace[i] += " -> " + i;
					}
				}
			}
			currentNode = this.minElementIndex(optimizedDistances); 
			this.usedNode[currentNode] = 1; 
			step++;
		}
	    return {
	    	trace: trace, 
	    	optimizedDistances: optimizedDistances
	    };
	}
}

//Returns the index of Arrays min element
Dijkstra.prototype.minElementIndex = function(array) {
	
	var min = [Number.POSITIVE_INFINITY, ];
	for (var i = 0, len = array.length; i < len; i++) {
		//Проверяем только непройденные вершины
		if (this.usedNode[i] === 0)
			if (array[i] < min[0])
			{
				min[0] = array[i];
				min[1] = i;
			}
	}

	return min[1];	
}