const typesOfCoffee = [
    {type: "Brygg Kaffe", cost: 20,},
    {type: "Cappuccino", cost: 30,},
    {type: "Latte", cost: 40,}
]

class Customer {
    constructor(){
        this.transactions = [];
        this.totalSpent = 0;
        this.totalCups = 0;
    }
    addNewTransactions(amount){
        this.transactions.push(amount)
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

let newCustomer = new Customer();
console.log(newCustomer)


const getPrice = (coffeeType) => {
    let coffeePrice = 0 
    for (let i = 0; i < typesOfCoffee.length; i++){
        if(typesOfCoffee[i].type === coffeeType){
            coffeePrice = typesOfCoffee[i].cost
        }
    }
    return coffeePrice
}


const onBuyButtonClick = () => {
    var select = document.getElementById('coffeeType');
        var coffeeType = select.options[select.selectedIndex].value;
        const quantity = document.getElementById("numberOfCoffees").value

        let purchaseObject = {
            type: coffeeType,
            quantity: quantity,
            price: 0,
            totalPrice: 0,
        }

        purchaseObject.price = getPrice(coffeeType)
        purchaseObject.totalPrice = purchaseObject.price * quantity

        newCustomer.addNewTransactions(purchaseObject)
        newCustomer.totalTransactions()
        console.log(newCustomer)

        console.log(coffeeType, quantity)

        document.getElementById("totalSpent").innerHTML = `Du har handlat för ${newCustomer.totalSpent}kr`

        outputTransactions()

        coffeeStatus()


}

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

const clearElementFromChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}