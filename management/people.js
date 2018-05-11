/**task "People management"

Create form in html file for adding people with following fields:
name
sex (male/female/other)
birth date
address
phone
email
and table with the same columns under the form for added people.

When we click “save” button you should create instance of User. 
Every time when we create new user, push it’s instance to users array, 
then render our users to table under the form.

User should inherit next method from SuperUser:
    changeDataVisibility() //changes value of property isDataVisible (from User)

When we click on table row (tr), we have to get user by index from array and call 
changeDataVisibility. Depending on isDataVisible property 
you should show or hide all columns in table except name for current user.
// tip: user’s index can be stored in tr attribute, for instance */

(() => {
    let listOfUsers = [];

    function SuperUser() {
        this.isDataVisible = true;        
    };
    SuperUser.prototype.changeDataVisibility = function () {
        this.isDataVisible = !this.isDataVisible;
    };

    function User(name, sex, birthday, address, phone, email) {
        SuperUser.call(this);

        this.name = name;
        this.sex = sex;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.email = email;
    };

    User.prototype = Object.create(SuperUser.prototype);
    User.prototype.constructor = User;

    document.querySelector('form[name=form]').addEventListener('click', createInstance);
    
    function createInstance(e) {
        var userForm = document.forms['form'];
        var user = new User(
            userForm.name.value,
            userForm.sex.options[userForm.sex.selectedIndex].value,
            userForm.birthday.value,
            userForm.address.value,
            userForm.email.value
        );

        listOfUsers.push(user);
        fillTable(user);
        userForm.reset();
        e.preventDefault(user);
    }

    function fillTable(user) {
        var table = document.getElementById('table');
        var row = table.insertRow(listOfUsers.indexOf(user)+1);
        row.dataset.index = listOfUsers.indexOf(user);

        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.sex;
        row.insertCell(2).innerText = user.birthDate;
        row.insertCell(3).innerText = user.address;
        row.insertCell(4).innerText = user.phone;
        row.insertCell(5).innerText = user.email;
    }

    document.getElementById('table').addEventListener('click', clickHandler);

    function clickHandler(e) {
        var row = e.target.closest('tr');
        if (row) {
            var index = row.dataset.index;
            var user = listOfUsers[index];
            user.changeDataVisibility();

            if (!user.isDataVisible) {
                for(var i = 0; i<row.children.length; i++) {
                    if (i===0) {
                        row.children[i].colSpan = row.children.length;
                    } else {
                        row.children[i].style.visibility = 'hidden';
                    }
                }
            } else {
                for(var i = 0; i<row.children.length; i++) {
                    row.children[i].colSpan = '';
                    row.children[i].style.visibility = '';
                }
            }
        }
    }
})();

