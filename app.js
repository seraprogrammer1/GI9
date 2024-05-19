// Explorer
const budget_type = document.getElementById("budget_type");
const search_bar = document.getElementById("search_bar");
const add_button = document.getElementById("add_button");

const middle_container = document.getElementById('middle-container');


const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const fields = document.querySelectorAll('.field');
const inform = document.getElementById('inform');
const enter_button = document.getElementById("enter_button");

const main = document.getElementById("bottom-explorer");


// adds a budget class
class Budget {
     // adds all key properties while also holding key encapsulated variables
    constructor(MainFolders){

        let _selected = undefined;
        // object the holds all mainFolders and there children
        // also has a way to get the root _Explorer so the buttonSetup and set the selected folder
        let _objects = {
            get root(){
                return _Explorer
            }
        };

        let _balance = {

            // updates the amount inside the balance object by connect to all the items in each folder and mainFolder
            update(){
                console.log(Object.entries(_objects))
    
                this.amount = 0
    
                for (let [key, folder] of Object.entries(_objects)){
                    if ( folder.operator == "+"){
                        this.amount += folder.findAmounts()
                    }
                    else if (folder.operator == "-") {
                        this.amount -= folder.findAmounts()
                    }
                }
                console.log(this.amount)
            },
    
            amount: 0,
        };

        // sets up the balance display
        const _balance_display = (() => {

            const balance_box = document.createElement('div');
            balance_box.id = 'balance-box';
            middle_container.appendChild(balance_box);
            balance_box.innerHTML = 
            `
            <p>Balance</p>
            <num>0</num>
            `
    
            return balance_box;
        })();

        // Explorer object the holds getters and setters
        let _Explorer = {

            // method to update the balance and display it
            balance() {
                _balance.update()
                _balance_display.querySelector('num').innerHTML = _balance.amount
            },
            
            // give the encapsulated _object that holds all MainFolders
            get explorerFolder() {
                return _objects
            },
            // adds to the encapsulated _object that holds all MainFolders
            // set explorerFolder(value) {
            //     console.log(value)
            //     _objects.push(value)
            // },
            // get the MainFolder from a path
            getMainFolder(path){
               return _objects[path.split('/')[0]]
            },

            // highlights a folder
            highlight(folder){
                if(!folder){return}// catches if set to undefined
                if (folder.selectedElement.classList.contains('selected')){
                    folder.selectedElement.classList.remove('selected')
                   }
                   else {
                    folder.selectedElement.classList.add('selected')
                   } 
            },
            
            // give the selected
            get selected() {
                return _selected;
            },
            
            // changes the selected
            set selected(value) {
                if (value == _selected){
                    this.highlight(_selected)
                    _selected = undefined;
                }
                else{
                    this.highlight(_selected)
                    _selected = value
                    this.highlight(_selected)
                    if(!_selected){return}// catches if set to undefined
                    if (budget_type.value != this.getMainFolder(_selected.path).option){
                        this.getMainFolder(_selected.path).option.selected = true;
                    }
                }   
            }
        }

        // creates the main folders from the MainFolders Array
        MainFolders.forEach((folder) => {
            const newMainFolder = new MainFolder(folder.name, _Explorer.explorerFolder,folder.operator)
        })

        // adds folders to the selected folder
        add_button.addEventListener('click', () => {
            if (_Explorer.selected){
                if (_Explorer.selected.path.split('/').length <= 2){
        
                    const promptName = prompt();
        
                    if (_Explorer.selected.nameList.indexOf(promptName) == -1){
                        const newFolder = new Folder(promptName,_Explorer.selected)
                        _Explorer.selected.nameList.push(promptName);
                    }
                    else
                    {
                        alert('can only use the same name once in a folder')
                    }
                }
                else {
                    alert('maximum folders hit')
                }
            }
        })
        
        // adds items to the selected folder
        // has validation only with add if requirements are met
        enter_button.addEventListener('click', () => {
            if (!_Explorer.selected){
                alert('please select and a folder from the Explorer')
                return
            }
        
            let passed = true;
        
            for (let i = 0; i < fields.length; i++){
                const input = fields[i]
                if (input.value == ''){
                    input.classList.add('redBorder');
                    passed = false;
                    if (inform.classList.contains('hide')){
                        inform.classList.remove('hide');
                    }
                    setTimeout(function(){
                        if (input.classList.contains('redBorder')){
                            input.classList.remove('redBorder');
                            if (document.querySelectorAll('.redBorder').length == 0 && !inform.classList.contains('hide')){
                                inform.classList.add('hide');
                            }
                        }
                    },2000)
                }
            }
        
            if (!passed) {
                return
            }
            if (_Explorer.selected.nameList.indexOf(nameInput.value) == -1){
                const newItem = new Item(nameInput.value, parseInt(amountInput.value), descriptionInput.value, _Explorer.selected)
                _Explorer.selected.nameList.push(nameInput.value);
                _Explorer.balance();
            }
            else
            {
                alert('can only use the same name once in a folder')
            }
        })
    }
}

class MainFolder {

    // adds all key properties
    constructor(name, parent, operator) {
        this.operator = operator;
        if (operator != "-" && operator != "+"){
            console.error("invalid Operator only + or - allowed")
            return;
        }
        
        this.name = name;
        this.amount = 0;
        this.items = [];
        this.parent = parent;
        this.path = `${name}`
        this.root = this.parent.root;

        this.element;
        this.addButton;
        this.minusButton;
        this.arrowButton;
        this.div;
        this.option;

        this.selectedElement;

        this.nameList = []

        this.parent[this.name] = this;

        // create an option for this folder in the select
        const option = document.createElement('option');
        option.value = this.name;
        option.innerHTML = this.name;
        this.option = option;

        budget_type.appendChild(option)
        
        this.createElement()

        // find item values within it self to get main amount and returns it
        this.findAmounts = function() {
            this.amount = 0

            this.items.forEach(element => {
                console.log(this.name, this.amount)
                if (element instanceof Folder){
                    this.amount = element.findAmounts(this.amount)
                }
                if (element instanceof Item){
                    this.amount = element.findAmounts(this.amount)
                }
            });
            this.num.innerHTML = this.amount;
            console.log(this)
            console.log(typeof this.amount)
            return this.amount
         }
    }

    //sets up button functions
    buttonSetup(){

        // Assign elements to folder array
        this.arrowButton = this.element.querySelector('span').querySelector('.arrow');
        this.div = this.element.querySelector('div');
        this.selectedElement = this.element.querySelector('span').querySelector('p');

        // allows you to hide the folder by changing the display of the itemHolder div
        this.arrowButton.addEventListener('click', () => {
           if (this.div.classList.contains('hide')){
            this.div.classList.remove('hide')
           }
           else {
            this.div.classList.add('hide')
           } 
        })

        // changes the selected folder
        this.selectedElement.addEventListener('click', () => {
            this.root.selected = this;
        })
    }

    // create the displayed amount
    createDisplay() {
        const box = document.createElement('div');
        box.id = `${this.name}-box`;
        middle_container.appendChild(box);
        box.innerHTML = 
        `
        <p>${this.name}</p>
        <num>0</num>
        `
        this.box = box;
        this.num = box.querySelector('num');
    }

    // creates new folders HTML elements and sets them up the buttonSetup
    createElement() {
        const newFolderElement = document.createElement('div')
 
        newFolderElement.id = `${this.name}_folder`
        newFolderElement.classList.add('folder');
        main.appendChild(newFolderElement);
        newFolderElement.innerHTML = 
         `
         <span>
             <p>${this.name}</p>
             <button class="arrow"><i class="fa-solid fa-chevron-down"></i></button>
         </span>
         <div>
 
         </div>
         `
         this.element = newFolderElement;
         this.buttonSetup();
         this.createDisplay()
     }
}
class Folder {
     // adds all key properties
    constructor(name, parent) {
        this.name = name;
        this.items = [];
        this.parent = parent;
        this.path = `${this.parent.path}/${name}`

        this.element;
        this.minusButton;
        this.arrowButton;
        this.div;
        this.root = this.parent.root;

        this.selectedElement;

        this.nameList = []

        this.parent.items.push(this);

        this.index =  this.parent.items.indexOf(this)
        
        this.createElement()
        this.parent.items[this.index] = this;


        this.findAmounts = function(value){

            this.amount = 0;

            this.items.forEach(element => {
                if (element instanceof Folder){
                    this.amount = element.findAmounts(this.amount)
                }
                if (element instanceof Item){
                    this.amount = element.findAmounts(this.amount)
                }
            });
            return value + this.amount
        }
    }
    //sets up button functions
    buttonSetup(){

        // Assign elements to folder array
        this.minusButton = this.element.querySelector('span').querySelector('.minus');
        this.arrowButton = this.element.querySelector('span').querySelector('.arrow');
        this.div = this.element.querySelector('div');
        this.selectedElement = this.element.querySelector('span').querySelector('p');

        // remove the folder from the parent and remove the element from HTML
        this.minusButton.addEventListener('click', () => {
            this.element.remove()
            this.parent.nameList.splice(this.parent.nameList.indexOf(this.name),1)
            this.parent.items.splice(this.index, 1);
            if (this.root.selected == this){
                this.root.selected = undefined;
            }
            this.root.balance()
        })
        // allows you to hide the folder by changing the display of the itemHolder div
        this.arrowButton.addEventListener('click', () => {
           if (this.div.classList.contains('hide')){
            this.div.classList.remove('hide')
           }
           else {
            this.div.classList.add('hide')
           } 
        })

        // changes the selected folder
        this.selectedElement.addEventListener('click', () => {
            this.root.selected = this;
        })
    }

    // creates new folders HTML elements and sets them up the buttonSetup
    createElement() {
        const newFolderElement = document.createElement('div')
 
        newFolderElement.id = `${this.parent}_${this.name}_${this.index}`
        newFolderElement.classList.add('folder');
        this.parent.div.appendChild(newFolderElement);
        newFolderElement.style = "width: 95%"
        newFolderElement.innerHTML = 
         `
         <span>
             <p>${this.name}</p>
             <button class="minus">-</button>
             <button class="arrow"><i class="fa-solid fa-chevron-down"></i></button>
         </span>
         <div>
 
         </div>
         `
         this.element = newFolderElement;
         this.buttonSetup();
     }
}

class Item {
     // adds all key properties
    constructor(name, amount, description,parent) {
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.parent = parent;
        this.path = `${this.parent.path}/${name}`

        this.element;
        this.minusButton;
        this.arrowButton;
        this.div;

        this.selectedElement;

        this.nameList = []

        this.parent.items.push(this);

        this.index =  this.parent.items.indexOf(this)
        
        this.createElement()
        this.parent.items[this.index] = this;

        this.findAmounts = function(value) {
            return value + this.amount
         }
    }
    //sets up button functions
    buttonSetup(){

        // Assign elements to folder array
        this.minusButton = this.element.querySelector('span').querySelector('.minus');
        this.arrowButton = this.element.querySelector('span').querySelector('.arrow');
        this.div = this.element.querySelector('div');

        this.selectedElement = this.element.querySelector('span').querySelector('span');
        // remove the folder from the parent and remove the element from HTML
        this.minusButton.addEventListener('click', () => {
            this.element.remove()
            this.parent.nameList.splice(this.parent.nameList.indexOf(this.name),1)
            this.parent.items.splice(this.index, 1);
            if (this.root.selected == this){
                this.root.selected = undefined;
            }
            this.root.balance()
        })

        // allows you to hide the folder by changing the display of the itemHolder div
        this.arrowButton.addEventListener('click', () => {
           if (this.div.classList.contains('hide')){
            this.div.classList.remove('hide')
           }
           else {
            this.div.classList.add('hide')
           } 
        })
    }

    // creates new folders HTML elements and sets them up the buttonSetup
    createElement() {
        const newFolderElement = document.createElement('div')
 
        newFolderElement.id = `${this.parent}_${this.name}_${this.index}`
        newFolderElement.classList.add('item');
        this.parent.div.appendChild(newFolderElement);
        newFolderElement.style = "width: 90%"
        newFolderElement.innerHTML = 
         `
         <span>
            <span>
                <p>${this.name}:</p>
                <p>$${this.amount}</p>
            </span>
             <button class="minus">-</button>
             <button class="arrow"><i class="fa-solid fa-bars"></i></button>
         </span>
         <div class="hide">
            <p>${this.description}</p>
         </div>
         `
         this.element = newFolderElement;
         this.buttonSetup();
     }
}

const budget = new Budget([{name: 'Income', operator: "+"},{name: 'Expense', operator: "-"}])
