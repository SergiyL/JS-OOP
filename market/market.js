/**You need to find, weigh and buy 15 items in supermarket.
Every item should have place, price and weight.
Also, you need to get a bill for each item. */

class Product {
    constructor(name, place, weight, price) {
        this.name = name;
        this.place = place;
        this.price = price;
        this.weight = weight;
    }

    findProduct() {
        return ` з відділу ${this.place}`;
    }

    weighProduct() {
        return ` важить ${this.weight} кілограмів`; 
    }

    buyProduct() {
        return ` та коштує ${this.weight * this.price} гривень`
    }

    bill() {
        return this.name + this.findProduct() + this.weighProduct() + this.buyProduct();
    }
}

class Shopping extends Product {
    constructor(name, place, weight, price) {
        super(name, place, weight, price);
        this.nameArr = ['банани', 'яблука', 'сливи', 'груші', 'капуста', 'молоко', 'сир', 'масло', 'сметана', 'йогурт', 'рис', 'гречка', 'горох', 'вівсянка', 'перловка'];
        this.sectionArr = ['фрукти та овочі', 'фрукти та овочі', 'фрукти та овочі', 'фрукти та овочі', 'фрукти та овочі', 'молочні продукти', 'молочні продукти', 'молочні продукти', 'молочні продукти', 'молочні продукти', 'крупи', 'крупи', 'крупи', 'крупи', 'крупи'];
        this.priceArr = [30, 20, 30, 30, 10, 10, 70, 120, 50, 50, 40, 40, 20, 15, 15];
        this.productsArr = [];
    }

    buyProducts() {
        for (let i = 0; i < 15; i++) {
            this.weight = Math.floor(Math.random() * 10)+1;  
            this.productsArr.push(new Product(this.nameArr[i], this.sectionArr[i], this.weight, this.priceArr[i]));
        }
    }
    
    returnArr() {
        for(let i of this.productsArr) {
            console.log(i.bill());
        }
    }
}

const shop = new Shopping();
shop.buyProducts();
shop.returnArr();
