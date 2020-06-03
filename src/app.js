import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
function getPosts (){
    http.get('http://localhost:3000/posts')
        .then(data=>{
            ui.showPost(data);
        })
        .catch()
};
// listen for post submit
document.querySelector('.post-submit').addEventListener('click', submitPost);

function submitPost (e){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const data = {
        title: title,
        body: body
    };
    http.post('http://localhost:3000/posts', data)
        .then(resData=>{
            // clear fields
            ui.clearFields();
            // show alert 
            ui.showAlert('Post Added', 'alert alert-success');
            // reload DOM and show new post 
            getPosts();
        })
        .catch(err=>console.log(err))
}

// Listen for edit state
document.querySelector('.fa-pencil').addEventListener('click', editPost);

function editPost(e){
    console.log('do you want to edit post??')
}