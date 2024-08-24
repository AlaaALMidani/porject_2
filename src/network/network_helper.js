
let baseUrl = 'http://127.0.0.1:8000/api/objects/generation';

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

export function postData(file) {
    const formData = new FormData();
    formData.append('name', 'hope');
    formData.append('image', file);
    formData.append('category', 'none');
    formData.append('type', 'object');
    formData.append('room', 1);

    fetch(baseUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
        },
        body: formData
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
