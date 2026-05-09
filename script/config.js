// Recuperation des variables
let total = document.getElementById("total");
let eyes = document.getElementById("masqueAffiche")

let montant = 0;

let ajoutBtn = document.getElementById('ajouter');
let getDepenseForm = document.querySelector('.depense');
let backBtn = document.getElementById("backBtn");

let historique = document.querySelector('.historique');


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
    })
})

// Validation du formulaire
function valideForm(amont){
    if(valideRegx.test(amont.value)){
        erreur.classList.add('hidden');
        validateFormBtn.addEventListener('click', (event)=>{
            event.preventDefault();
            montant += Number(amont.value);
            total.textContent = montant;
           if(amont.value > 0 || amont.value !== ''){
             setHistorique(historique, amont.value);

           }
            getDepenseForm.classList.add('hidden');
            amont.value = '';
        })
        
    }else{
        erreur.innerHTML = `<p style="border:1px #F60000; padding:2px; border-radius:5px; color:#FF3939">Somme Invalide</p>`;
        amont.value = ''
        validateFormBtn.disabled = true;
        
    }
}
montantDepense.addEventListener('change', ()=>{
    valideForm(montantDepense)
})

// Inserer l'historique
function setHistorique(histSection, amount){
    const Temps = Temporal.Now.plainDateTimeISO();
    histSection.innerHTML += `<div class="flex justify-between">
        <div>
            <p>${amount}</p>
            <p>${Temps.year} ${Temps.day}-${Temps.hour}-${Temps.minute}</p>
        </div>
        <div>
            ${categorieDepense.value}
        </div>
    </div>`;
}
