const apiurl="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
 
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const form=document.querySelector("form")
const search=document.getElementById("Search")
const main= document.getElementById("main")
const IMGPATH="https://image.tmdb.org/t/p/w1280"

getMovie(apiurl)

async function getMovie(url){
    const response=await fetch(url)
    const data= await response.json()
    showMovies(data.results)
}


function showMovies(movies){
    main.innerHTML=""

    movies.forEach(movie => {
        const movieEl=document.createElement("div")
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
        <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class=${getClassByRate(movie.vote_average)}>${movie.vote_average}</span>
        </div>
        <div class="overview"> <h3>Overview:</h3>${movie.overview}</div>
    
        
    `   
        main.appendChild(movieEl)   
       });
}

function getClassByRate(vote){
    if (vote>=8){
        return "green"
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    const searchTerm=search.value
    if(searchTerm){
        
        getMovie(SEARCHAPI+search.value)
        search.value=""
    }
})

