"use strict";

class Hamburger {
    constructor(containerSelector = '.hamburger',
                imgSelector = '.hamburger_img',
                consistId = 'consist',
                costId = 'total-cost',
                calorieId = 'total-calorie') {
        this.containerSelector = containerSelector;
        this.imgSelector = imgSelector;
        this.consistId = consistId;
        this.costId = costId;
        this.calorieId = calorieId;
        this._allComponents = [];
        this._components = [];
        this._cost = null;
        this._calorie = null;
        this._init();
    }
    
    _init() {
        this._fetchAllComponents();
        this._components = [{category: 'size', name: 'little', cost: 50, calorie: 20},
                           {category: 'filling', name: 'cheese', cost: 10, calorie: 20}];
        this._cost = this._getCalculatedCostAndCalorie().cost;
        this._calorie = this._getCalculatedCostAndCalorie().calorie;
        this._renderInfo();
        this._render();
        document.querySelector(this.containerSelector).addEventListener('click', (event) => {this._containerClickHandler(event)});
    }
    
    _fetchAllComponents() {
        this._allComponents = [
            {category: 'size', name: 'little', cost: 50, calorie: 20},
            {category: 'size', name: 'big', cost: 100, calorie: 40},
            {category: 'filling', name: 'cheese', cost: 10, calorie: 20},
            {category: 'filling', name: 'salad', cost: 20, calorie: 5},
            {category: 'filling', name: 'potatoes', cost: 15, calorie: 10},
            {category: 'topping', name: 'sauce', cost: 15, calorie: 0},
            {category: 'topping', name: 'mayonnaise', cost: 20, calorie: 5}
        ];
    }
    
    _getCalculatedCostAndCalorie(cost = 0, calorie = 0) {
        for (let component of this._components) {
            cost += component.cost;
            calorie += component.calorie;
        }
        return {cost, calorie};
    }
    
    _renderInfo() {
        const buttonElems = document.querySelectorAll('.button_choose-hamburger');
        
        for (let elem = 0; elem < buttonElems.length; elem++) {
            for (let component of this._allComponents) {
                if (buttonElems[elem].id === component.name) {
                    const newElem = document.createElement('span');
                    newElem.insertAdjacentHTML('beforeend', `Cost: ${component.cost}  Calorie: ${component.calorie}`);
                    newElem.classList.add('hamburger_info');
                    buttonElems[elem].before(newElem);
                    continue;
                }
            }
        }
    }
    
    _render() {
        const imgElem = document.querySelector(this.imgSelector),
              componentsNames = this._getComponentsNames();
        
        for (let name = 0; name < componentsNames.length; name++) {
            switch (componentsNames[name]) {
                case 'little':
                    imgElem.style.width = 'auto';
                    continue;
                case 'big':
                    imgElem.style.width = '150px';
                    continue;
                case 'cheese':
                    imgElem.style.filter = 'hue-rotate(0deg)';
                    continue;
                case 'salad':
                    imgElem.style.filter = 'hue-rotate(25deg)';
                    continue;
                case 'potatoes':
                    imgElem.style.filter = 'hue-rotate(-25deg)';
                    continue;
                case 'sauce':
                    imgElem.style.filter += 'opacity(0.8)';
                    continue;
                case 'mayonnaise':
                    imgElem.style.filter += 'sepia(0.2)';
                    continue;
            }
        }
        
        document.getElementById(this.consistId).innerHTML = componentsNames.join(' ');
        document.getElementById(this.costId).innerHTML = this._cost + 'rub';
        document.getElementById(this.calorieId).innerHTML = this._calorie + 'cal';
    }
    
    _getComponentsNames() {
        let names = [];
        for (let component of this._components) {
            names.push(component.name);
        }
        return names;
    }
    
    _containerClickHandler(event) {
        if  (event.target.tagName !== 'BUTTON' ) {
            return;
        } else {
            const componentName = event.target.id;
            const component = this._getComponentByName(componentName);
            
            if (componentName.startsWith('no-')) {
                this._removeTopping(componentName);
            } else if (componentName === 'buy') {
                this._takeIt();
            } else {
                this._fetchOrReplaceComponent(component);
            }
            
            this._cost = this._getCalculatedCostAndCalorie().cost;
            this._calorie = this._getCalculatedCostAndCalorie().calorie;
            this._render();
        }
    }
    
    _getComponentByName(name) {
        return this._allComponents.find((component) => {return component.name === name});
    }
    
    _removeTopping(name) {
        if (name === 'no-topping') {
            for (let index = 0; index < this._components.length; index++) {
                if (this._components[index].category === 'topping') {
                    this._components.splice(index, 1);
                    index -= 1;
                }
            }
        } else {
            for (let index = 0; index < this._components.length; index++) {
                if (`no-${this._components[index].name}` === name) {
                    this._components.splice(index, 1);
                    break;
                }
            }
        }
    }
    
    _takeIt() {
        let message = `You take ${this._components[0].name} hamburger with ${this._components[1].name}`,
            toppings = [];
        for (let component of this._components) {
            if (component.category === 'topping') {
                toppings.push(component.name);
            }
        }
        if (toppings.length === 0) {
            alert(`${message}.\nIt cost: ${this._cost}rub.\nIt callorie: ${this._calorie}cal.`);
        } else {
            alert(`${message}, ${toppings.join(', ')}.\nIt cost: ${this._cost}rub.\nIt callorie: ${this._calorie}cal.`)
        }
    }
    
    _fetchOrReplaceComponent(component) {
        if (this._isUnique(component) && (this._isTopping(component) || !this._isSameType(component))) {
                this._components.push(component);
            } else {
                this._replaceComponent(component);
            }
    }
    
    _isUnique(newComponent) {
        for (let component of this._components) {
            if (newComponent.name === component.name) {
                return false;
            }
        }
        return true;
    }
    
    _isTopping(newComponent) {
        return newComponent.category === 'topping';
    }
    
    _isSameType(newComponent) {
        for (let component of this._components) {
            if (newComponent.category === component.category) {
                return true;
            }
        }
        return false;
    }
    
    _replaceComponent(newComponent) {
        for (let index = 0; index < this._components.length; index++) {
            if (this._isTopping(this._components[index]) && this._components[index].name === newComponent.name) {
                this._components.splice(index, 1, newComponent);
                break;
            } else if (!this._isTopping(this._components[index]) && this._components[index].category === newComponent.category) {
                this._components.splice(index, 1, newComponent);
                break;
            }
        }
    }
}

new Hamburger();