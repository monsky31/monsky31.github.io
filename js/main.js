const loadPeringkat = () => {
  getPeringkatCache()

    let peringkat = getPeringkat();
    
    peringkat.then((data) => {
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
                <h4>Leaderboard</h4>
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
  };
  
  const loadPertandingan = () => {
    getPertandinganCache()

    let pertandingan = getPertandingan();
    
    pertandingan.then((data) => {
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
  };


  const loadFavorit = () => {
    const content = document.getElementById("body-content");
    let timFav = ambilfavtim();
    
    Promise.all([timFav]).then((values) => {
      console.log(values);
      let html = "";
      let TimItem = "";
  
      values[0].forEach((tim) => {
        TimItem += `
        <li class="collection-item avatar">
        <span class="title">${tim.nama}</span>
        <a href="#favorites" class="secondary-content" onclick="hapusfavtim(${tim.id})"><i class="material-icons">delete</i></a>
      </li>
        `;
      });

      html += `
      <div class="row">
        <div class="col s12">
        <h4>Favorite</h4>
        <hr>
            <h6>${TimItem}<h6>
        </div>
      </div>
    `;

    content.innerHTML = html;
  });
};



  // IndexDB Operation
const dbPromise = idb.open("football", 1, (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains("Fav")) {
    upgradeDb.createObjectStore("Fav", { keyPath: "id" });
  }
});

const tambahfavtim = (id, nama, logo) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction("Fav", "readwrite");
      let store = tx.objectStore("Fav");
      let item = {
        id: id,
        nama: nama,
        logo: logo,
        createdAt: new Date().getTime(),
      };
      store.put(item);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: `Added to favorite!` });
      console.log("Tim berhasil disimpan");
    })
    .catch((err) => {
      console.error("Failed add to favorite", err);
    });
};

const ambilfavtim = () => {
  return dbPromise.then((db) => {
    let tx = db.transaction("Fav", "readonly");
    let store = tx.objectStore("Fav");
    return store.getAll();
  });
};

const hapusfavtim = (id) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction("Fav", "readwrite");
      let store = tx.objectStore("Fav");
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: "Deleted" });
      loadFavorit();
    })
    .catch((err) => {
      console.error("Error : ", err);
    });
};