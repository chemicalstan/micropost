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
    if(e.target.textContent === 'Post It'){
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        if(title === '' || body === ''){
            ui.showPost('Please fill in all fields', 'alert alert-danger');
        }else{
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
                .catch(err=>console.log(err));
        }
    }
    
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
                    ui.changeFormState('add');
                })
                .catch(err=>console.log(err));
        }
    }
}

// Listen for edit state
document.querySelector('#post').addEventListener('click', enableEdit);

function enableEdit(e){
    e.preventDefault()
    // event delegation 
    if(e.target.parentElement.classList.contains('edit') && !document.querySelector('.post-cancel')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const data = {
            id,
            title,
            body
        }
        // change UI to edit state
        ui.fillForm(data);
        document.querySelector('.post-update').addEventListener('click', updatePost);
    }
}

function updatePost(e){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
    const data = {
        title,
        body,
        id
    };
    http.put(`http://localhost:3000/posts/${id}`, data)
        .then(resData=>{
            // change form state to default 
            ui.changeFormState('add');
            // clear fields
            ui.clearFields();
            // show alert 
            ui.showAlert('Post Updated', 'alert alert-success');
            // reload DOM and show new post 
            getPosts();
        })
        .catch(err=>console.log(err));
}
// cancel edit state 
document.querySelector('.card-form').addEventListener('click', changeToAddState)
function changeToAddState(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add')
    }
}