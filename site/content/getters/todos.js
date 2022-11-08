export default async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
  const result = await response.json();
  return result
}
