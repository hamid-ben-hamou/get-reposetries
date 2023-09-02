// main variables
let theInput = document.querySelector('.get-repos input'), 
	getBitton = document.querySelector('.get-repos .get-botton'),
	reposData = document.querySelector('.show-data');

getBitton.onclick = function () {
	getRepos();
}

// get repose function 
function getRepos() {
	if (theInput.value === "") {
		reposData.innerHTML = "<span>Please Write Github Username</span>";
	} else{
		fetch(`https://api.github.com/users/${theInput.value}/repos`)
		.then((response) => response.json())
		.then((reposetres) => {
			if (reposetres.length === 0) {
				reposData.innerHTML = "No Repositres To Show";
			} else {
				reposData.innerHTML = "";
			}
			// loop on Data of Repositres
			reposetres.forEach(repo => {
				// create main div
				let mainDiv = document.createElement('div');
				// add class name
				mainDiv.className = "box";
				// create paragraphe take name of repo
				let myP = document.createElement('p');
				// add name to p
				myP.textContent = repo.name;
				// create div named info take a and span
				let info = document.createElement('div');
				// add class name 
				info.className = "info";
				// create link to visite repo
				let visiteRepo = document.createElement('a');
				// add text
				visiteRepo.textContent = "Visite";
				// add hypertext reference to link
				visiteRepo.href = `https://github.com/${theInput.value}/${repo.name}`;
				// set target blank
				visiteRepo.setAttribute("target", "_blank");
				// create number of stars
				let stars = document.createElement('span');
				// add text content
				stars.textContent = `Stars ${repo.stargazers_count}`;

				// append all this element one by one
				mainDiv.append(myP, info);
				info.append(visiteRepo, stars);
				reposData.appendChild(mainDiv);
			});
		});
	}
}