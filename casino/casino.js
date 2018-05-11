/**task "Casino"

Потрібно створити два класи Casino (Казино) і SlotMachine (Ігровий Автомат)
Конструктор класу Casino приймає два параметри: кількість SlotMachine у казино (number) і початкову суму грошей яка заноситься в казино (number).
Конструктор класу SlotMachine приймає один вхідний параметр: початкову суму грошей яка заноситься в автомат (number).

При створенні екземпляру Casino його конструктор створює необхідну кількість екземплярів SlotMachine (один з екземплярів SlotMachine повинен бути lucky) 
і розподіляє рівномірно(залишок заноситься на перший автомат) вхідну суму між усіма автоматами.

Клас Casino має мати публічні методи, які дозволяють:
Отримати загальну суму грошей у казино
Отримати кількість автоматів у казино
Додати новий автомат (в цьому випадку новий автомат має отримати як стартову суму, половину грошей з автомата, у якому їх на даний момент найбільше)
Видалити автомат за номером (гроші з видаленого автомату розподіляються між рештою кас)
Забрати з казино гроші. Вхідний аргумент - сума (number). Функція має зібрати потрібну суму з автоматів(послідовність від автомата, у якому грошей найбільше,
до автомата у якому грошей найменше) і повернути її.

Клас SlotMachine має мати публічні методи, які дозволяють:
Отримати загальну суму грошей у автоматі
Забрати гроші . Вхідний аргумент - сума (number).
Покласти гроші . Вхідний аргумент - сума (number).

Зіграти. Вхідний аргумент - сума (number) грошей яку гравець закидує в автомат. Гроші зараховуються у суму автомату. Метод генерить випадкове 3-х значне число
(наприклад 124). Якщо у числі 2 цифри однакові, повертається сума у 2 рази більша ніж прийшла в аргументі (і віднімається від суми грошей в автоматі). 
Якщо 3 цифри однакові - повертається 5-кратна сума. Якщо число дорівнює 777, повертаються усі гроші, які є в автоматі. Якщо даний SlotMachine є lucky тоді 
3-х значне число не випадкове а дорівнює 777.
Необхідно запобігти нелогічній поведінці (кількість автоматів менше нуля, намагаємось видалити неіснуючий автомат, кількість грошей в автоматі чи в казино 
менше нуля)
Потрібно написати скрипт, який буде демонструвати роботу усіх створених методів. */

class Casino{
    constructor(quantitySlotMachine, bank) {
        this.quantitySlotMachine = quantitySlotMachine;
        this.bank = bank;
        this.machinesInstanses = [];
        let random = Math.floor(Math.random() * this.quantitySlotMachine);
        let reminder = bank%quantitySlotMachine;
        let amountToInitialize = (bank-reminder)/quantitySlotMachine;
        this.isLucky = false;

        this.initializeInstances(random, amountToInitialize, reminder);
    }    

    initializeInstances(random, amountToInitialize, reminder) {
        for(let i = 0; i < this.quantitySlotMachine; i++) {
            if(i == 0) {
                this.machinesInstanses.push(new SlotMachine(amountToInitialize + reminder, false));
            } else { this.machinesInstanses.push(new SlotMachine(amountToInitialize, false));}
            
            if(i == random) {
                this.machinesInstanses[random].isLucky = true;
            }
        }
    }
    
    allMoney() {
        return 'загальна сума грошей наявна в казино ' + this.bank; /// Отримати загальну суму грошей у казино
    }

    allMachines() {
        return 'кількість гральних автоматів наявних в казино ' + this.machinesInstanses.length;  ///Отримати кількість автоматів у казино
    }

    addNewMachine() {  /// Додати новий автомат (в цьому випадку новий автомат
        let maxMoney = 0;                  //  має отримати як стартову суму, половину грошей з автомата, у якому їх на даний момент найбільше)
        let donorMachine = {};
        for(let i of this.machinesInstanses) {
            if(i.money > maxMoney) {
                maxMoney = i.money;
                donorMachine = i;
            }
        }
        this.machinesInstanses.push(new SlotMachine(donorMachine.money/2)); 
        donorMachine.money -= donorMachine.money/2;
        return 'даний автомат був доданий. сума коштів в автоматі ' + this.machinesInstanses[this.machinesInstanses.length-1].money + '. загальна кількість автоматів ' + this.machinesInstanses.length;
    }                                                                           

    removeMachine(number) {  ///Видалити автомат за номером (гроші з видаленого автомату розподіляються між рештою кас)
        if(this.machinesInstanses.length > number) {
            let removedMoney = this.machinesInstanses[number-1].money/this.machinesInstanses.length-1;
            this.machinesInstanses.splice(number-1,1);
            for(let i of this.machinesInstanses) {
                i.money += removedMoney;
            }
            return 'автомат з порядковим номером ' + number + ' вилучений. залишок автоматів ' + this.machinesInstanses.length
        }
        return 'такий автомат відсутній';
        
    }

    getMoney(sum) {  /// Забрати з казино гроші. Вхідний аргумент - сума (number). Функція має зібрати потрібну суму з 
        if (sum < this.bank) {
            let sumOfMoney = 0;            //автоматів(послідовність від автомата, у якому грошей найбільше,до автомата у якому грошей найменше) і повернути її.
            for(let i of this.machinesInstanses.sort((a,b)=>{return b.money - a.money})){      
                if(sumOfMoney < sum && (sum - sumOfMoney) > i.money) {
                    sumOfMoney += i.money;
                    i.money = 0;
                } else if (sumOfMoney < sum && (sum - sumOfMoney) < i.money) {
                    while (sum > sumOfMoney) {
                        sumOfMoney++;
                        i.money--;
                    }
                }
            }
            return 'вилучена сума складає ' + sum + '. залишок складає ' + (this.bank-=sum);
        }
        return 'сума котру ви намагаєтесь вилучити відсутня';
    }

    testSlotMachine() {
        let random = Math.floor(Math.random() * this.machinesInstanses.length);
        this.machine = this.machinesInstanses[random - ((random == 0)? 0 : 1)];
        console.log(this.machine.playTheGame(35));
        console.log(this.machine.allMoney());
        console.log(this.machine.addMoney(350));
        console.log(this.machine.getMoney(159));
    }
}  
