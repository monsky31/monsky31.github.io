const API_KEY = '041f442ac94a4520978332ce2237557b'
const base_url = "https://api.football-data.org/v2/";
const peringkat = `${base_url}competitions/2002/standings`
const pertandingan = `${base_url}competitions/2002/matches`

const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}

var status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

var toJSON = response => {
  return response.json();
}

const getPeringkatCache = () => {
  if ("caches" in window) {
    caches.match(peringkat).then((response) => {
      if (response) {
        response.json().then((data) => {
          const content = document.getElementById("body-content");
          let str = JSON.stringify(data).replace(/http:/g, "https:");
          data = JSON.parse(str);
          let html = "";
      
          let item = "";
          data.standings[0].table.forEach((result) => {
            item += `
                    <tr>
                        <td>${result.position}</td>
                        <td class="rata-kiri"> <img class="responsive-img" width="60" height="60" src="${
                          result.team.crestUrl || "img/empty_badge.svg"
                        }"> ${result.team.name}</td>
                        <td>${result.playedGames}</td>
                        <td>${result.won}</td>
                        <td>${result.draw}</td>
                        <td>${result.lost}</td>
                        <td>${result.points}</td>
                        <td><a class="waves-effect waves-light blue darken-1 btn" onclick="tambahfavtim(${
                          result.team.id
                        }, '${result.team.name}', '${
              result.team.crestUrl
            }');">Add</a></td>
                    </tr>
                  `;
          });
      
          html += `
          <div class="row">
                <div class="card-title">
                    <h4>Bundesliga</h4>
                    <hr>
                <div class="col s12 m11 l12">
                    <table class="striped centered responsive-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Team</th>
                                <th>Played Games</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                            </tr>
                        </thead>
            
                        <tbody> 
                        ${item}              
                        </tbody>
                    </table>
                </div>
            </div>
            `;
          content.innerHTML = html;
        });
      }
    });
  }
};


const getPertandinganCache = () => {
  if ("caches" in window) {
    caches.match(pertandingan).then((response) => {
      if (response) {
        response.json().then((data) => {
          const content = document.getElementById("body-content");
          let html = "";
          let item = "";
      
          data.matches.forEach((match) => {
            item += `
              <div class="col s12 m6">
                <div class="card horizontal flex f-width align-item-center">
                    <div class="card-content">
                      <div class="row">
                        <div class="col s12 m12 l12 justify-center">
                          <p class=" text-darken-3">${new Date(match.utcDate).toLocaleDateString('en-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div class="row mb">
                      <div class="col s5 m5 l5">
                          <h6>Home</h6> 
                          ${match.homeTeam.name}
                      </div>
                      <div class="col s2 m2 l2">
                          <h5>VS</h5>
                      </div>
                      <div class="col s5 m5 l5">
                          <h6>Away</h6> 
                          ${match.awayTeam.name}  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `;
          });
      
          html += `
          <div class="row">
            <div class="col s12">
              <h4>Schedule</h4>
              <hr>
              ${item}
            </div>
          </div>
              `;
      
          content.innerHTML = html;
        });
      }
    });
  }
};

const getPeringkat = () => {
    return fetchAPI(peringkat).then(status).then(toJSON);
  };
  
  const getPertandingan = () => {
    return fetchAPI(pertandingan).then(status).then(toJSON);
  };
  