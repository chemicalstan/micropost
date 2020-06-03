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

// Listen for delete state 
document.querySelector('#post').addEventListener('click', deletePost);

function deletePost(e){
    // e.preventDefault()
    if(e.target.parentElement.classList.contains('delete')){
        if(window.confirm('are you sure you want to delete post?')){
            const deleteId = e.target.parentElement.dataset.id;
            http.delete(`http://localhost:3000/posts/${deleteId}`)
                .then(resData=>{
                    ui.showAlert(resData, 'alert alert-success');
                    getPosts();
                })
                .catch(err=>console.log(err));
        }
    }
}

// Listen for edit state
document.querySelector('#post').addEventListener('click', enableEdit);

function enableEdit(e){
    e.preventDefault()
    if(e.target.parentElement.classList.contains('edit')){
        console.log(e.target.parentElement.dataset.id)
    }
}