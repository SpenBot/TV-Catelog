

//// DOM ELEMENTS /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const searchForm = document.getElementById('searchForm')
const showDetails = document.getElementById('showDetails')
const showSearch = document.getElementById('showSearch')

const searchResults = document.getElementById('searchResults')
const searchResultsCount = document.getElementById('searchResultsCount')




//// GLOBAL VARIABLES /////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const url = 'http://api.tvmaze.com/search/shows?q='
const urlSingle = 'http://api.tvmaze.com/singlesearch/shows?q='






//// HANDLE SEARCH SUBMIT /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

searchForm.addEventListener('submit', (e) => {

  e.preventDefault()

  // reset searchResultsDiv
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  // hide showDetails, show searchResults
  showDetails.style.display = "none"
  searchResults.style.display = "flex"


  // set search query
  let query = showSearch.value

  // fetch data from API
  fetch(url + query)
    .then(res => res.json())
    .catch(err => console.log(err))

    // configure data
    .then(data => {

      // create searchItem div for each data, then append to results window
      data.forEach(item => {
        let searchItem = document.createElement('div')
        searchItem.setAttribute('class', 'showSearchItem')
        searchItem.setAttribute('data-title', `${item.show.name}`)
        // searchItem.setAttribute('data-id', `${item.show.id}`)

        let searchItemTitle = document.createElement('h4')
        searchItemTitle.innerHTML = item.show.name
        let searchItemImage = document.createElement('img')
        searchItemImage.setAttribute("src", `${item.show.image.medium}`)

        searchItem.appendChild(searchItemTitle)
        searchItem.appendChild(searchItemImage)

        searchItem.addEventListener('click', handleShowSelect)

        searchResults.appendChild(searchItem)

      })

      // display results count
      searchResultsCount.innerHTML = `Found ${data.length} results for "${query}"`
      searchResultsCount.style.visibility = 'visible'

      // reset search bar
      showSearch.value = ''

    })


})






//// HANDLE SELECT SHOW ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function handleShowSelect () {

  // console.log(this.dataset.id)
  console.log(this.getAttribute('data-title'))

  // reset searchResultsDiv
  while (showDetails.firstChild) {
    showDetails.removeChild(showDetails.firstChild);
  }

  // hide searchResults, show showDetails
  searchResults.style.display = "none"
  showDetails.style.display = "flex"

  // set query as show name (id)
  let querySingle = this.dataset.title

  // fetch single show data, and create elements and add to showDetails div
  fetch(urlSingle + querySingle)
    .then(res => res.json())
    .catch(err => console.log(err))

    .then(res => {
      console.log(res)

      let title = document.createElement('h2')
      let image = document.createElement('img')
      let description = document.createElement('div')
      let premiered = document.createElement('p')
      let link = document.createElement('a')
      let goBack = document.createElement('div')

      title.innerHTML = res.name
      image.src = res.image.medium
      description.innerHTML = res.summary
      premiered.innerHTML = `premiered: ${res.premiered}`
      goBack.innerHTML = "GO BACK"
      goBack.setAttribute('class', 'goBackDiv')

      goBack.addEventListener('click', ()=> {
        searchResults.style.display = "flex"
        showDetails.style.display = "none"
      })

      showDetails.appendChild(title)
      showDetails.appendChild(image)
      showDetails.appendChild(description)
      showDetails.appendChild(premiered)
      showDetails.appendChild(goBack)
    })
}





//// END ///////////////////////////////////////////////////////////////////
