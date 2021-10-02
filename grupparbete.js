//systematisk deklaration av databas-array
const typesOfCoffee = [
    {type: "Brygg Kaffe", cost: 20,},
    {type: "Cappuccino", cost: 30,},
    {type: "Latte", cost: 40,}
]
//deklaration av class med en constructor metod som deklarer 3 variabler och 2 metoder.
class Customer {
    constructor(){
        this.transactions = [];
        this.totalSpent = 0;
        this.totalCups = 0;
    }
    addNewTransactions(amount){
        //unshift pushar in i arrayen från längst bak.
        this.transactions.unshift(amount)
    }
    totalTransactions() {
        this.totalSpent = 0
        this.totalCups = 0
        this.transactions.forEach(transaction => {
            console.log(transaction)
            this.totalSpent += transaction.totalPrice
            this.totalCups += transaction.quantity
        

        })
    }

}

//deklaration av objekt new Customer som följer "class Customers" regler.
let newCustomer = new Customer();

//deklaration av funktionen getPrice
const getPrice = (coffeeType) => {
    let coffeePrice = 0 
    for (let i = 0; i < typesOfCoffee.length; i++){
        if(typesOfCoffee[i].type === coffeeType){
            coffeePrice = typesOfCoffee[i].cost
        }
    }
    return coffeePrice
}

//deklaration av funktionen onBuyButtonClick() med 4 variabler
const onBuyButtonClick = () => {
        const select = document.getElementById('coffeeType');                                                                               
        const coffeeType = select.options[select.selectedIndex].value;
        const quantity = document.getElementById("numberOfCoffees").value

        let purchaseObject = {
            type: coffeeType,
            quantity: Number(quantity),
            price: 0,
            totalPrice: 0,
        }

        purchaseObject.price = getPrice(coffeeType)
        purchaseObject.totalPrice = purchaseObject.price * quantity

        //lägger variabeln purchaseObject som en parameter i newCustomers metod "addNewTransactions".
        newCustomer.addNewTransactions(purchaseObject)
        newCustomer.totalTransactions()
        //console.log(newCustomer)

        //console.log(coffeeType, quantity)

        document.getElementById("totalSpent").innerHTML = `Du har handlat för ${newCustomer.totalSpent}kr`

        outputTransactions()

        coffeeStatus()


}
//deklaration av funktion coffeeStatus() med if sats för medlemsskapsnivå
const coffeeStatus = () => {
    if (newCustomer.totalCups <= 0){
        document.getElementById("coffeeStatus").innerHTML = `Du har inte köpt någon kaffe`
    }
    else if (newCustomer.totalCups < 10){
        document.getElementById("coffeeStatus").innerHTML = `Du har medlemskapsstatus: Brons`
    }
    else if(newCustomer.totalCups >=10 && newCustomer.totalCups < 30){
        document.getElementById("coffeeStatus").innerHTML = `Du har medlemskapsstatus: Silver`
    }
    else if(newCustomer.totalCups >= 30){
        document.getElementById("coffeeStatus").innerHTML = `Du har medlemskapsstatus: Guld`
    }
}
//deklaration av funktionen för att skriva ut transaktionshistorik
const outputTransactions = () => {
    const div = document.getElementById('transactionParagraphs');
    clearElementFromChildren(div);
    newCustomer.transactions.forEach((transaction) => {
        let msg = `Du har köpt ${transaction.quantity}st ${transaction.type} för ${transaction.price} st. Summa: ${transaction.totalPrice}`
        const p = document.createElement('p');
        const textNode = document.createTextNode(msg);
        p.append(textNode);
        div.appendChild(p);
    })  
}
//funktionen gör att div:en nollställs inför nästa gång javascripten körs
const clearElementFromChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}