

const searchForm = document.getElementById('github-form')

function getUsers(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
        .then((res) => res.json())
        .then((json) => createUserList(json))
}

function createUserList(json) {
    json['items'].forEach(data => {
        let userName = document.createElement('li')
        const userList = document.querySelector('#user-list')
        let moreDetails = document.createElement('h4')
        moreDetails.classList.add('users')
        moreDetails.innerHTML = data.login
        const seeDetailsBtn = document.createElement('button')
        seeDetailsBtn.innerText = 'See Repos'
        userList.appendChild(userName)
        userName.appendChild(moreDetails)
        userName.appendChild(seeDetailsBtn)

        function getRepos(repoJson) {
            repoJson.forEach(object => {
                let repoName = document.createElement('h5')
                repoName.innerHTML = object.name
                userName.appendChild(repoName)

            })


        }



        seeDetailsBtn.onclick = () => {
            seeDetailsBtn.remove()
            fetch(`https://api.github.com/users/${data.login}/repos`)
                .then((res) => res.json())
                .then((json) => getRepos(json))




        }

    })
}





document.addEventListener('submit', (e) => {
    let user = document.querySelector('#search').value
    getUsers(user)
    e.preventDefault()


})