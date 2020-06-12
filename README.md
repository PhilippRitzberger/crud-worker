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
const crudworker = require('crudworker')
```

or

```javascript
import crudworker from 'crudworker'
```



To **POST** data:

```javascript
let body = {
      		title: 'foo',
      		body: 'bar',
      		userId: 1
    	 }

crudworker.post('http://jsonplaceholder.typicode.com/posts', JSON.stringify(body))
  	.then( (data) => {
        console.log({ data: JSON.parse(data)})
    })
```



To **GET** data, call the `get` function of `crudworker`:

```javascript
crudworker.get('http://jsonplaceholder.typicode.com/users/1').then( (data) => {
	console.log({ data: JSON.parse(data)})
})
```



To **PATCH** Data:

```javascript
let body = { title: 'foo'}

crudworker.patch('http://jsonplaceholder.typicode.com/posts/1', JSON.stringify(body))
    .then( (data) => {
        console.log({ data: JSON.parse(data)})
    })
```



And finally to **DELETE** data:

```javascript
crudworker.delete('http://jsonplaceholder.typicode.com/users/1').then( (data) => {
    console.log({ data: JSON.parse(data)})
})
```

