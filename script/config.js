// Recuperation des variables
let total = document.getElementById("total");
let eyes = document.getElementById("masqueAffiche");
let montant = 0;
let listHistorique = [];
let ajoutBtn = document.getElementById('ajouter');
let getDepenseForm = document.querySelector('.depense');
let backBtn = document.getElementById("backBtn");

let historique = document.querySelector('.historique');

if(getStorage()){
    montant = Number(localStorage.getItem('totalSum'));
    console.log(montant)
    // localStorage.clear()
    total.textContent = montant;
    getHistorique();
}
// Formulaire de depense
const valideRegx = /^[^-+][0-9]{1,5}$/;
let montantDepense = document.getElementById('montantDepense');
let categorieDepense = document.getElementById('categorie')
let validateFormBtn = document.getElementById('valider');

let erreur = document.getElementById('erreur');


// oeil ouvert ou slash
function openCloseEyes(eyes){
    if(eyes.innerHTML !== `<i class="fa-solid fa-eye-slash"></i>`){
        eyes.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
        total.textContent = total.textContent.replace(total.textContent, "******")
    }else{
        eyes.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        total.textContent = montant;
    }
}
eyes.addEventListener('click', ()=>{
    openCloseEyes(eyes);
    
});

//Afficher/Masquer Ajouter une depense avec le formulaire

ajoutBtn.addEventListener('click', ()=>{
    getDepenseForm.classList.toggle('hidden');
    backBtn.addEventListener('click', () =>{
        getDepenseForm.classList.add('hidden');
        erreur.classList.add('hidden');
    })
})

// Validation du formulaire
function valideForm(amont){
    if(valideRegx.test(amont.value)){
        erreur.classList.add('hidden');
        validateFormBtn.addEventListener('click', (event)=>{
            event.preventDefault();
            montant += Number(amont.value);
            localStorage.setItem('totalSum', montant);
            total.textContent = montant;
           if(amont.value > 0 || amont.value !== ''){
             setHistorique(historique, amont.value);

           }
            getDepenseForm.classList.add('hidden');
            amont.value = '';
        })
        
    }else{
        erreur.innerHTML = `<p style="border:1px solid #F60000; padding:2px; border-radius:5px; color:#FF3939">Somme Invalide</p>`;
        amont.value = ''
        validateFormBtn.disabled = true;
        
    }
    // localStorage.clear()
    // console.log(localStorage)
}
montantDepense.addEventListener('change', ()=>{
    valideForm(montantDepense)
})

// Inserer l'historique
function setHistorique(histSection, amount){
    const Temps = new Date().toLocaleString().split(' ');
    let div = document.createElement('div');
    div.classList = 'flex justify-between mx-1.5 leading-relaxed border border-white rounded-lg mt-1 p-1';
    div.innerHTML = `<div>
            <p>${amount}</p>
            <p>${Temps[0]} à ${Temps[1]}</p>
        </div>
        <div>
            ${categorieDepense.value}
        </div>
    </div>`
    console.log(div)
    histSection.appendChild(div);
    listHistorique.unshift(div.outerHTML);
    console.log(listHistorique)
    localStorage.setItem('listDepense', JSON.stringify(listHistorique))
}

function getStorage(){
    let saved = localStorage.getItem('totalSum');
    return saved;
}
function getHistorique(){
    let histoList = localStorage.getItem('listDepense');
    listHistorique = JSON.parse(histoList);
    console.log(listHistorique);
    for(let i = 0; i < listHistorique.length; i++){
        if(i===5){
            return;
        }
        historique.innerHTML += listHistorique[i];
    }
    
}
// vider le localStorage

function viderLocalStorage(){
    localStorage.clear();
    historique.textContent = '';
    montant = 0;
    total.textContent = montant;
    listHistorique = []
    console.log(localStorage)
}

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click',() =>viderLocalStorage());