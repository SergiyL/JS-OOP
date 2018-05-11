class SlotMachine {
    constructor(money) {   /// Конструктор класу SlotMachine приймає один вхідний параметр: початкову суму грошей яка заноситься в автомат (number).
        this.money = money;
    }

    randomNumber() {    /// Метод генерить випадкове 3-х значне число(наприклад 124).
        this.gameNumber = '';
        for(let i = 0; i < 3; i++){
            this.gameNumber += Math.floor(Math.random() * 10).toString();
        }
        return this.gameNumber;
    }

    playTheGame(bet) {  /// 
        var game = this.randomNumber();
        if (this.isLucky == true) {    //Якщо даний SlotMachine є lucky тоді 3-х значне число не випадкове а дорівнює 777.
            game = '777';
            console.log('ви щасливчик!!!');
        }
        console.log('випав номер ' + game);

        if(game == '777') {  //Якщо число дорівнює 777, повертаються усі гроші, які є в автоматі. 
            let jackpot = this.money;
            this.money = 0;
            return 'ви виграли ' + jackpot;
        } else if(game[0] == game[1] && game[0] == game[2]) {  //Якщо 3 цифри однакові - повертається 5-кратна сума.
            this.money -= bet*5;
            return 'ви виграли ' + bet*5;
        } else if(game[0] == game[1] || game[0] == game[2] || game[1] == game[2]) {  //Якщо у числі 2 цифри однакові, повертається сума у 2 рази більша ніж прийшла в аргументі (і віднімається від суми грошей в автоматі). 
            this.money -= bet*2;
            return 'ви виграли ' + bet*2;
        } else {
            return 'ви не виграли нічого. спробуйте ще раз';
        }
    }

    allMoney() {  //Отримати загальну суму грошей у автоматі
        return 'залишок грошей в автоматі ' + Math.floor(this.money);
    }

    getMoney(sum) {   //Забрати гроші . Вхідний аргумент - сума (number).
        if(sum < this.money) {
            let reminder = this.money - sum;
            this.money = reminder;
            return 'вилучена сума ' + sum + '. залишок ' + Math.floor(this.money);
        }
        
        return 'сума котру ви намагаєтесь вилучити більша за наявну в автоматі';
    }

    addMoney(addingSum) {  //Покласти гроші . Вхідний аргумент - сума (number).
        
        return 'додана сума ' + addingSum + '. загальна сума ' + Math.floor(this.money += addingSum);
    }
}