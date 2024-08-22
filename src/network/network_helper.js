let baseUrl = 'https://503f-169-150-196-137.ngrok-free.app'


getData(url)
{
    
fetch(url, {
	method: 'GET',
	mode: 'no-cors',
    baseUrl:baseUrl,
	headers: {
		'Authorization':
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
		, 'Content-Type': 'application/json' 
	},
	body: JSON.stringify({
		'file':file 
		, 'td_model':{file}
		, 'td_model[name]': 'any'
		, 'material': {file}
		, 'td_model[description]':'description'
		, 'td_model[type]': 'object'
		, 'room': 2
	}) 
})
	.then(response => {
		if (!response.ok) {
			console.log(response);
		}
		return response.json(); 
	})
	.then(data => {
		console.log(data); 
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});



}


postData(url)
{
    
fetch(url, {
	method: 'POST',
	mode: 'no-cors',
    baseUrl:baseUrl,
	headers: {
		'Authorization':
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
		, 'Content-Type': 'application/json' 
	},
	body: JSON.stringify({
		'file':file 
		, 'td_model':{file}
		, 'td_model[name]': 'any'
		, 'material': {file}
		, 'td_model[description]':'description'
		, 'td_model[type]': 'object'
		, 'room': 2
	}) 
})
	.then(response => {
		if (!response.ok) {
			console.log(response);
		}
		return response.json(); 
	})
	.then(data => {
		console.log(data); 
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});



}