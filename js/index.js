

const searchForm = document.getElementById('github-form')
let repoList = document.querySelector('#repo-list')





function getUsers(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
        .then((res) => res.json())
        .then((json) => createUserList(json))



}

function showUserRepository(username) {

}

function displayRepos(repos) {


    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.textContent = repo.name;
    });


}

function createUserList(json) {
    const userList = document.querySelector('#user-list')
    json['items'].forEach(data => {
        let userName = document.createElement('li')
        let moreDetails = document.createElement('h4')
        moreDetails.classList.add('users')
        moreDetails.innerHTML = data.login
        const seeDetailsBtn = document.createElement('button')
        seeDetailsBtn.innerText = 'More Details'
        userName.appendChild(seeDetailsBtn)

        userList.appendChild(userName)

        seeDetailsBtn.onclick = () => {
            let username = data.login
            fetch(`https://api.github.com/users/${username}/repos`)
                .then((res) => res.json())
                .then((json) => displayRepos(json))

        }
        userName.appendChild(moreDetails)


    })




}



document.addEventListener('submit', (e) => {
    let user = document.querySelector('#search').value
    getUsers(user)
    e.preventDefault()


})