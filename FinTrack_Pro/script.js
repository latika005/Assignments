const addTransaction = document.querySelector(".Add-transaction");
const transactionForm = document.querySelector(".make-new-transaction");
const bg = document.querySelector(".bg");
const submit = document.querySelector(".submitNewTransaction");
const details = document.querySelector("transaction-details");
const lists = document.querySelector(".lists");
const dashboard = document.querySelector(".dashboard");
const settings = document.querySelector(".settings");
// Transaction form filling

const transactions = document.querySelector(".transactions");
const resetBtn = document.querySelector(".reset-button");

// Making a new Transaction
addTransaction.addEventListener("click", () => {
    transactionForm.style.visibility = "visible";
    // document.body.style.overflow = "hidden";
})
bg.addEventListener("click", () => {
    transactionForm.style.visibility = "hidden";
    // document.body.style.overflow = "visible";
})

// Delete all transactions
resetBtn.addEventListener("click", () => {
    lists.replaceChildren(); 
    alert("Deleted all transactions");
})

const dashboardBtn = document.querySelector(".dashboard-page-button");
const settingsBtn = document.querySelector(".settings-button");

dashboardBtn.addEventListener("click", () => {
    dashboard.style.visibility = "visible";
    settings.style.visibility = "hidden";
})

settingsBtn.addEventListener("click", () => {
    settings.style.visibility = "visible";
    dashboard.style.visibility = "hidden";
})

submit.addEventListener("click", () => {
const description = document.querySelector(".description input").value;
const amount = document.querySelector(".amount input").value;
const  date = document.querySelector(".date input").value;
const transactionType = document.querySelector(".transaction-type").value;
const category = document.querySelector(".Category").value;

if( description.trim() ==="" || amount.trim() === "" ){
    alert("Fill the required fields !");
    return;
}

const div = document.createElement("div");

div.classList.add(".done-transactions");

   div.innerHTML += `
   <div class="done-transactions">
                <p>${date}</p>
                <p>${description}</p>
                <p>${category}</p>
                <p>2${amount}</p>
                <p class="actions"><i id="editBtn" class="ri-pencil-line"></i><i id="DeleteBtn" class="ri-delete-bin-2-line"></i></p>
            </div> 
   `

   lists.appendChild(div);
 transactionForm.style.visibility = "hidden";
 document.body.style.overflow = "visible";
 
document.querySelector(".description input").value = " ";
document.querySelector(".amount input").value = " ";
document.querySelector(".Category").value = " ";

})

const delTransaction = document.querySelector("#DeleteBtn");

delTransaction.addEventListener("click", () => {
    const transact = delTransaction.closest("div");
    console.log(transact)
    transact.remove();
})

