const API_URL = 'https://api.github.com/users/';

const form = document.querySelector('#form');
const search =document.getElementById('search');
const main = document.getElementById('main');



form.addEventListener('submit',(event)=> {
    event.preventDefault();
    const user = search.value;
    if(user) {
        getUser(user)
        search.value=''
    }
})


async function getUser(userName) {
try {
    const {data} = await axios(API_URL+userName);
   // console.log(data)
    createUserCard(data);
    getRepos(userName)
} catch (error) {
   //console.log(error)
   createErrorCard("Aradığınız kullanıcı bulunamadı");
}
}

function createUserCard(user) {
const userName = user.name || user.login;
const userBio = user.bio ? user.bio: "";

    const cardHTML = `
    <div class="card">
    <img
    class="user-image"
    src=${user.avatar_url}
    alt=${user.name}
  />
  <div class="user-info">
        <div class="user-name">
            <h2>${userName}</h2>
            <small>@${user.login}</small>
        </div>
  </div>

  <p>
  ${userBio}
  </p>
  <ul>
    <li>
        <i class="fa-solid fa-user-group"></i>
        ${user.followers} <strong>Followers</strong>
    </li>
    <li>
       ${user.following} <strong>Following</strong>
    </li>
    <li>
        <i class="fa-solid fa-bookmark"></i>
        ${user.public_repos} <strong>Repositories</strong>
    </li>
  </ul>
  <div class="repos" id="repos"></div>

</div>
    
    `
    main.innerHTML= cardHTML;
}

function createErrorCard(message) {
    const errorCardHTML = `
        <div class= "card">
            <h2> ${message}</h2>
        </div>
    `
    main.innerHTML=errorCardHTML;

}

async function getRepos(userName) {
    try {
        const {data} = await axios(API_URL + userName + "/repos")
        addReposToCard(data)
    } catch (error) {
        createErrorCard("REpoları çekerken hata oluştu")
    }
}

function addReposToCard(repos) {
    const reposElement = document.getElementById("repos");
    repos.slice(0,3).forEach(repo => {
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.target= "_blank";
        repoLink.innerHTML = `
             <i class="fa-solid fa-book-bookmark"></i>
             ${repo.name}

        `

        reposElement.appendChild(repoLink)
    });
}