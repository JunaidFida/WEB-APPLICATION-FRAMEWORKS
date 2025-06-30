import fetch from 'node-fetch'

async function getCOmments(){
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const resJson = await res.json()
}

getCOmments();

