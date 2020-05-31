class UI {
    constructor(){
        this.post = document.getElementById('post');
        this.titleInput = document.querySelector('#title');
        this.bodyInpuyt = document.querySelector('#body');
        this.idInpuyt = document.querySelector('#id');
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
    }
}


export const ui = new UI();