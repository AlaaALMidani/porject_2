let baseUrl = 'https://0225-149-102-244-116.ngrok-free.app/api/'


export async function imageTo3dModel(url, file) {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const response = await fetch(`${baseUrl}${url}`, {
			method: 'POST',
			headers: {
				'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
			},
			body: formData
		});

		if (!response.ok) {
			console.log(response);
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		const links = [data.objLink, data.mtlLink, data.pngLink]; // Adjust these keys based on your API response

		links.forEach(link => {
			const a = document.createElement('a');
			a.href = link;
			a.download = link.split('/').pop(); // Extract the file name from the URL
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});

	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
}
// getData(url)
// {
// fetch(url, {
// 	method: 'GET',
// 	mode: 'no-cors',
//     baseUrl:baseUrl,
// 	headers: {
// 		'Authorization':
// 			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
// 		, 'Content-Type': 'application/json' 
// 	},
// 	body: JSON.stringify({
// 		'file':file 
// 		, 'td_model':{file}
// 		, 'td_model[name]': 'any'
// 		, 'material': {file}
// 		, 'td_model[description]':'description'
// 		, 'td_model[type]': 'object'
// 		, 'room': 2
// 	}) 
// })
// 	.then(response => {
// 		if (!response.ok) {
// 			console.log(response);
// 		}
// 		return response.json(); 
// 	})
// 	.then(data => {
// 		console.log(data); 
// 	})
// 	.catch(error => {
// 		console.error('There was a problem with the fetch operation:', error);
// 	});
// }


export function postData(file, url) {
	fetch(url, {
		method: 'POST',
		mode: 'no-cors',
		baseUrl: 'https://7539-178-52-187-59.ngrok-free.app/api',
		// headers: {
		// 	'Content-Type': 'application/json'
		// },
		body: JSON.stringify({
			'image': file
			, 'name': 'any'
			, 'description': 'description'
			, 'type': 'object'
			, 'room': 2
			, 'category': 'none'
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
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NTcwMDM4LCJpYXQiOjE3MjQ1NjI4MzgsImp0aSI6ImU4MTk5OWJmYjZiZDQ4NzJhMWI0ZjRjZjIyZjRhNWM5IiwidXNlcl9pZCI6OH0.xIr6AYknKRQ6i5xCAmuZP2NHEfg121oYL6e5ckohkO0'

const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NTc4NzQ3LCJpYXQiOjE3MjQ1NzE1NDcsImp0aSI6IjA2MTczN2QxODVjMzQ1OTJiMzQ1MmM2ZmYxZGVmZGRiIiwidXNlcl9pZCI6OH0.SmnxhdOMMvJxbtcVzPXzwDsCmQcwJCvvUWcXyY7IAvE`);

const requestOptions = {
  method: "GET",
  headers: {
	"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NTc4NzQ3LCJpYXQiOjE3MjQ1NzE1NDcsImp0aSI6IjA2MTczN2QxODVjMzQ1OTJiMzQ1MmM2ZmYxZGVmZGRiIiwidXNlcl9pZCI6OH0.SmnxhdOMMvJxbtcVzPXzwDsCmQcwJCvvUWcXyY7IAvE`,
	'Content-Type': 'application/json'
},
  mode:'cors'

};
export function getModelData(url) {
	fetch(
		`https://7539-178-52-187-59.ngrok-free.app/api/objects/80`,
		requestOptions
	,)
		.then(response => {
			if (!response.ok) {
				console.log(response);
			}
			console.log(response.text.toString)
			console.log(response.text)
			console.log(response)
			return response.text;
		})
		.then(data => {
			console.log(data);

		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}
