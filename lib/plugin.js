const http = require('https')

let worker

const tasks = {}

const request = (method) => {
    return {
        method, 
        headers: {
            'Content-Type': 'application/json'
        } 
    } 
} 

const onmessage = (event) => {
    const { uuid, query } = event.data
    
    const req = http.request(query.url, query.request, (res) => {
        let resdata

        res.setEncoding('utf-8')
        
        res.on('data', (chunk) => {
            resdata += chunk
        })

        res.on('end', () => {
            postMessage({ uuid, data: resdata})
            return redata
        })
    })

    req.on('error', (err) => {
        console.error(`problem with request: ${err.message}`)
        postMessage({ uuid, error: err})
    })

    if(query.body) {
        req.write(query.body)
    }

    req.end()
}

if(global.Worker) {
    worker = new Worker(
        URL.createObjectURL(
            new Blob(
                [`onmessage = ${String(onmessage)}`],
                { type: 'text\/javascript'}
            )
        )
    )
} else {
    worker = {
        listener: null,
        addEventListener: (eventType, callback) => { 
            worker.listener = callback
        }, 
        postMessage: (input) => {
            const { uuid, query } = input 

            const req = http.request(query.url, query.request, (res) => {
                let resdata = ''
        
                res.setEncoding('utf-8')
                
                res.on('data', (chunk) => { 
                    resdata += chunk 
                })
        
                res.on('end', () => { 
                    worker.listener({ uuid, data: resdata}) 
                })
            })
        
            req.on('error', (err) => {
                console.error(`problem with request: ${err.message}`)
                worker.listener({ uuid, error: err})
            })
        
            if(query.body) {
                req.write(query.body)
            }
        
            req.end()
        }
    }
}

worker.addEventListener('message', (event) => {
    const uuid = event.uuid
    const data = event.data 

    tasks[uuid].promise.then( () => {
        delete tasks[uuid]
    })     

    tasks[uuid].res(data)
}, false)

const crudworker = {
    post: (url, body, req = request('POST')) => {
        const uuid = `${(Math.random() * 1000)}_${Date.now()}` 

        tasks[uuid] = ( () => {
            let res, rej

            const promise = new Promise( (resolve, reject) => {
                res = resolve
                rej = reject
            })

            return {
                promise, res, rej
            } 
        })()
        
        const query = {
            url: url,
            request: req,
            body
        }

        worker.postMessage( { uuid, query } )

        return tasks[uuid].promise
    },
    get: (url, req = request('GET')) => {
        const uuid = `${(Math.random() * 1000)}_${Date.now()}` 

        tasks[uuid] = ( () => {
            let res, rej

            const promise = new Promise( function(resolve, reject) {
                res = resolve
                rej = reject
            })

            return {
                promise, res, rej
            } 
        })() 
        
        const query = {
            url: url,
            request: req,
            body: null
        }

        worker.postMessage( { uuid, query } )

        return tasks[uuid].promise
    }, 
    patch: (url, body, req = request('PATCH')) => {
        const uuid = `${(Math.random() * 1000)}_${Date.now()}` 

        tasks[uuid] = ( () => {
            let res, rej

            const promise = new Promise( (resolve, reject) => {
                res = resolve
                rej = reject
            })

            return {
                promise, res, rej
            } 
        })()
        
        const query = {
            url: url,
            request: req,
            body
        }

        worker.postMessage( { uuid, query } )

        return tasks[uuid].promise
    },
    delete: (url, req = request('DELETE')) => {
        const uuid = `${(Math.random() * 1000)}_${Date.now()}` 

        tasks[uuid] = ( () => {
            let res, rej

            const promise = new Promise( (resolve, reject) => {
                res = resolve
                rej = reject
            })

            return {
                promise, res, rej
            } 
        })()
        
        const query = {
            url: url,
            request: req,
            body: null
        }

        worker.postMessage( { uuid, query } )

        return tasks[uuid].promise
    }
} 

module.exports = crudworker
