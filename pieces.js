import { ajoutListenerAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

const reponse = await fetch("http://localhost:8081/pieces/");
const pieces = await reponse.json();

ajoutListenerEnvoyerAvis();

function genererPiece(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i]
    
        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");
    
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "Pas de catégorie";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = `Disponibilité: ${article.disponibilite === true ? "En stock" : "Rupture de stock"}`;
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
    
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);
        pieceElement.appendChild(avisBouton);
    }
    //Ajout fonction ajoutListenerAvis
    ajoutListenerAvis();
}

genererPiece(pieces)


/**filtres & bouttons */
    const boutonTrier = document.querySelector(".btn-trier");
    boutonTrier.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a,b){
            return a.prix - b.prix;
        });
        //console.log(piecesOrdonnees)
        document.querySelector(".fiches").innerHTML = "";
        genererPiece(piecesOrdonnees)
    })

    const btnDecroissant = document.querySelector(".btn-trier-decroissant");
    btnDecroissant.addEventListener("click", function () {
        const piecesDesordonnees = Array.from(pieces);
        pieces.sort(function (a,b){
            return b.prix - a.prix;
        });
        //console.log(piecesDesordonnees)
        document.querySelector(".fiches").innerHTML = "";
        genererPiece(piecesDesordonnees)
    })

    const boutonFiltrer = document.querySelector(".btn-filtrer");
    boutonFiltrer.addEventListener("click", function () {
        const pieceFiltrees = pieces.filter(function (piece){
            return piece.prix <= 35;
        });
        //console.log(pieceFiltrees)
        document.querySelector(".fiches").innerHTML = "";
        genererPiece(pieceFiltrees)
    })

    const btnDescription = document.querySelector(".btn-filtrer-description");
    btnDescription.addEventListener("click", function () {
        const pieceFiltrees = pieces.filter(function (piece){
            return piece.description;
        });
        //console.log(pieceFiltrees)
        document.querySelector(".fiches").innerHTML = "";
        genererPiece(pieceFiltrees)
    })

    const inputPrixMax = document.getElementById("inputRange");
    inputPrixMax.addEventListener("input", function () {
        const piecesFiltrees = pieces.filter(function (piece) {
            return piece.prix <= inputPrixMax.value;
        })
        //console.log(pieceFiltrees)
        document.querySelector(".fiches").innerHTML = "";
        genererPiece(piecesFiltrees)
    })

/** */

/**DOM statique */
    const noms = pieces.map(piece => piece.nom);

    for(let i = pieces.length -1; i >= 0; i--){
        if(pieces[i].prix > 35){
            noms.splice(i,1)
        }
    }
    //console.log(noms)
    const abordablesElement = document.createElement("ul");
    for(let i = 0; i < noms.length; i++){
        const nomElement = document.createElement("li");
        nomElement.innerText = noms[i];
        abordablesElement.appendChild(nomElement);
    }
    document.querySelector(".abordables").appendChild(abordablesElement)

    const nom = pieces.map(piece => piece.nom);
    const prix = pieces.map(piece => piece.prix);

    for(let i = pieces.length -1; i >= 0; i--){
        if(pieces[i].disponibilite === false){
            nom.splice(i,1);
        };
    };
    //console.log(nom)
    const disponibleElement = document.createElement("ul");
    for(let i = 0; i < nom.length; i++){
        const nomElement = document.createElement("li");
        nomElement.innerText = `${nom[i]} - ${prix[i]} €`;
        disponibleElement.appendChild(nomElement);
    }
    document.querySelector(".disponible").appendChild(disponibleElement)

/** */