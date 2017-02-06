var Dijkstra = function(distances, firstVertex, showRoot) {
	

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
	if (isNaN(firstVertex)) {
		console.log("Vertex number must be a number!");
		return -1;
	}

	var arrayLength = distances.length;

	if (firstVertex < 0 || firstVertex >= arrayLength) {
		console.log("The number of first vertex shouldn't exceed the number of all vertices!");
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


	this.usedVertex = new Array(arrayLength); //Visited vertices
	var optimizedDistances = new Array(arrayLength); //The length of shortest path

	
	for (i = 0; i < arrayLength; i++)
	{
		optimizedDistances[i] = Number.POSITIVE_INFINITY;
		this.usedVertex[i] = 0; //0 - not visited, 1 - visited vertex
	}
	this.usedVertex[firstVertex] = 1;
	optimizedDistances[firstVertex] = 0;
	var currentVertex = firstVertex; //set the current vertex

	var step = 0;

	if (!showRoot) { //if we dont need to see the trace

		while (step < arrayLength) {
			for (i = 0; i < arrayLength; i++)
			{	
				if (this.usedVertex[i] === 0) //dont touch visited vertices
				{
					optimizedDistances[i] = Math.min(optimizedDistances[i], (optimizedDistances[currentVertex] + distances[currentVertex][i]));
				}
			}
			
			currentVertex = this.minElementIndex(optimizedDistances); //Set new current vertex	
			this.usedVertex[currentVertex] = 1; //mark the vertex as visited
			step++;
		}
		return optimizedDistances;
	}

	else { //if we want to see the trace
		
		var trace = new Array(arrayLength); 
		trace[currentVertex] = currentVertex;

		while (step < arrayLength) {
			for (i = 0; i < arrayLength; i++)
			{
				if (this.usedVertex[i] === 0) //dont touch visited vertices
				{
					if (optimizedDistances[i] > optimizedDistances[currentVertex] + distances[currentVertex][i]) {
						optimizedDistances[i] = optimizedDistances[currentVertex] + distances[currentVertex][i];
						trace[i] = trace[currentVertex];
						trace[i] += ", " + i;
					}
				}
			}
			currentVertex = this.minElementIndex(optimizedDistances); 
			this.usedVertex[currentVertex] = 1; 
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
		if (this.usedVertex[i] === 0)
			if (array[i] < min[0])
			{
				min[0] = array[i];
				min[1] = i;
			}
	}

	return min[1];	
}