import API from 'axios';

try {
  const response = API.post('http://localhost:22222/api/todolist', {
    posted_data: 'example',
  });
  console.log(' Returned data:', response);
} catch (e) {
  console.log(` Axios request failed: ${e}`);
}
