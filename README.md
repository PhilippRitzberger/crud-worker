# crud-worker

Crud-worker aims to wrap the basic CRUD-Rest requests inside of a Web Worker for multithreaded API calls 🚀.

Currently supported 🥳:
  * POST
  * GET
  * PATCH
  * DELETE

## Install:



```bash
npm i --save crud-webworker
```



## Usage:

Import crud-webworker:

```javascript
const crudworker = require('crud-worker')
```

or

```javascript
import { crudworker } from 'crud-worker'
```



To **POST** data:

```javascript
let body = {
      		title: 'foo',
      		body: 'bar',
      		userId: 1
    	 }

crudworker.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(body))
  	.then( (data) => {
        console.log({ data: JSON.parse(data)})
    })
```



To **GET** data, call the `get` function of `crudworker`:

```javascript
crudworker.get('https://jsonplaceholder.typicode.com/users/1').then( (data) => {
	console.log({ data: JSON.parse(data)})
})
```



To **PATCH** Data:

```javascript
let body = { title: 'foo'}

crudworker.patch('https://jsonplaceholder.typicode.com/posts/1', JSON.stringify(body))
    .then( (data) => {
        console.log({ data: JSON.parse(data)})
    })
```



And finally to **DELETE** data:

```javascript
crudworker.delete('https://jsonplaceholder.typicode.com/users/1').then( (data) => {
    console.log({ data: JSON.parse(data)})
})
```

