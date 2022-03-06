
// CONNECT KE API MENGGUNAKAN JQUERY
// $('.search-button').on('click', function(){
//     $.ajax({
//         url:'http://www.omdbapi.com/?apikey=28caa441&s=' + $('.input-keyword').val(),
//         success : hasil => {
//             const movies = hasil.Search;
//             let card = '';
            
//             movies.forEach(m => {
//                 card += showCard(m);
//             });
//             $('.movie-container').html(card);
    
//             //ketika tombol detail di click
//             $('.modal-detail-btn').on('click', function(){
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=28caa441&i=' + $(this).data('imdbid'),
//                     success: (m) => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error : (e) => {
//                         alert(e.responseText);
//                     }
//                 })
//             });
//         },
//         error : (e) => {
//             console.log(e.responseText);
//         }
//     });
// });


// CONNECT KE API MENGGUNAKAN FETCH JAVASCRIPT
// ambil element ke html
// Menjalanakan proses cari film
const searchBtn = document.querySelector('.search-button');

searchBtn.addEventListener('click', function(){
    const inputKey = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?apikey=28caa441&s=' + inputKey.value)
        .then(response => response.json())
        .then(response => {
            const movie = response.Search;
            let cards = '';
            movie.forEach(mv => cards += showCard(mv));
            const mvContainer = document.querySelector('.movie-container');
            mvContainer.innerHTML = cards;

            // fungsi tombol detail film
            const detailBtn = document.querySelectorAll('.modal-detail-btn');
            //karena detailBtn adalah nodeList atau array, bukan single element jadi kita harus looping terlebih dahulu
            detailBtn.forEach(dBtn => {
                dBtn.addEventListener('click', function(){
                    const imdbid = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=28caa441&i=' + imdbid)
                    .then(response => response.json())
                    .then(m => {
                        const movieDetail = showMovieDetail(m);
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = movieDetail;
                    });
                    
                });
            });

        });
});


function showCard(m){
    return `<div class="col-md-4 my-5">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title text-muted">${m.Title}</h5>
          <p class="card-text">${m.Year}</p>
          <a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">Details</a>
        </div>
      </div>
   </div>`;
}


function showMovieDetail(m){
    return `<div class="container-fuid">
    <div class="row">
    <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid">
    </div>
    <div class="col-md">
        <ul class="list-group">
        <li class="list-group-item"><h4>${m.Title}</h4></li>
        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
        <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
        <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
        <li class="list-group-item"><strong>Plot :</strong> ${m.Plot}</li>
        </ul>
    </div>
    </div>
</div>`;
}