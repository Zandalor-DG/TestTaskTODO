import API from 'axios';

try {
  let userData = API.get('http://localhost:22222/api/todolist', {
    params: {
      results: 1,
      inc: 'name,email,picture',
    },
  });
} catch (e) {
  console.log(` Axios request failed: ${e}`);
}
