let enter = document.querySelector('#username');
enter.addEventListener('submit', result);

let search = document.querySelector('.fa-search');
search.addEventListener('click', result);

 function result(event){
        event.preventDefault();

        document.querySelector(".fa-circle-o-notch").classList.remove("hidden");
        document.querySelector(".grid-container").classList.add("hidden");

        var name = document.querySelector('input').value;
        const searchQuery = name.trim();

        document.querySelector(".repos-name").innerHTML = "";
    
        get_user_api(searchQuery);
    }
async function get_user_api(name) {
    const url1 = `https://api.github.com/users/${name}`;
    const url2 = `https://api.github.com/users/${name}/repos`;

    try{
        const user = await fetch(url1);
        const repos = await fetch(url2);
    
        if(!user.ok){
            throw Error(user.statusText);
        }
        if(!repos.ok){
            throw Error(repos.statusText);
        }
        const user_data = await user.json();
        const repos_data = await repos.json();

        display(user_data,repos_data);

    }catch(err){
        console.log(err);
        alert("failed to fetch");
    }finally{
        document.querySelector(".fa-circle-o-notch").classList.add("hidden");
    }
}

function display(data1, data2){
    document.querySelector(".grid-container").classList.remove("hidden");

    document.querySelector(".grid-container").classList.remove("hidden");
    document.querySelector('img').src = data1.avatar_url;
    document.querySelector('#name').textContent = data1.name;
    document.querySelector('#bio').textContent = data1.bio;
    document.querySelector('#followers').textContent = `${data1.followers} followers`;
    document.querySelector('#following').textContent = `${data1.following} following`;
    document.querySelector('#repos').textContent = `${data1.public_repos} repos`;
    
    for(let count=0;count<10;count++){
        let d = data2[count].full_name;
        document.querySelector(".repos-name").insertAdjacentHTML(
            'beforeend',
            `<p id=repository>${d.split('/')[1]}`
        );
    }  
}



