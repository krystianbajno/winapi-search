// https://github.com/axotion/simple-debouncer/blob/master/index.js

let token = 'intial_value'

export function debounce(fn, timeout) {
    token = Math.random().toString(36).substr(2, 10);
    let currentToken = token
    setTimeout(() => {
         if(currentToken === token) {
             fn()
         } 
     }, timeout)
}