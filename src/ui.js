class UI {
    constructor(){
        this.post = document.getElementById('post');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }
    showPost(posts){
        let output = '';
        posts.forEach(post=>{
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.title}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `});
        this.post.innerHTML = output;
    };
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = ''
    }
    clearAlert(){
        const alert = document.querySelector('.alert');
        
        if(alert){
            alert.remove();
        }
    }

    showAlert(message, className){

        this.clearAlert();
        // create div
        const div = document.createElement('div');
        // add class
        div.className = className;
        div.appendChild(document.createTextNode(message));
        // grab parent Node
        const container = document.querySelector('.postsContainer');
        // get posts
        const post = document.querySelector('#post')
        // insert alert before posts
        container.insertBefore(div, post)
        setTimeout(()=>{
            this.clearAlert()
        }, 3000)
    }
}


export const ui = new UI();