"use strict";

class Hamburger {
    constructor(container = '.hamburger') {
        this.container = container
        this.allComponents = [];
        this.components = [];
        this.cost = null;
        this.calorie = null;
        this._init();
        document.querySelector(this.container).addEventListener('click', (event) => {this._containerClickHandler(event)});
    }
    
    _init() {
        this._fetchAllComponents();
        this.components = [{category: 'size', name: 'little', cost: 50, calorie: 20},
                           {category: 'filling', name: 'cheese', cost: 10, calorie: 20}];
        this.cost = this._calculateCostAndCalorie().cost;
        this.calorie = this._calculateCostAndCalorie().calorie;
        this._render();
    }
    
    _fetchAllComponents() {
        this.allComponents = [
            {category: 'size', name: 'little', cost: 50, calorie: 20},
            {category: 'size', name: 'big', cost: 100, calorie: 40},
            {category: 'filling', name: 'cheese', cost: 10, calorie: 20},
            {category: 'filling', name: 'salad', cost: 20, calorie: 5},
            {category: 'filling', name: 'potatoes', cost: 15, calorie: 10},
            {category: 'topping', name: 'sauce', cost: 15, calorie: 0},
            {category: 'topping', name: 'mayonnaise', cost: 20, calorie: 5}
        ];
    }
    
    _containerClickHandler(event) {
        if  (event.target.tagName !== 'BUTTON' ) {
            return;
        } else {
            const name = event.target.id;
            const component = this._getComponentByName(name);
            
            if (name.startsWith('no-')) {
                this._removeTopping(name);
            } else if (name === 'buy') {
                this._takeIt();
            } else {
                this._fetchOrReplaceComponent(component);
            }
            
            this.cost = this._calculateCostAndCalorie().cost;
            this.calorie = this._calculateCostAndCalorie().calorie;
            this._render();
        }
    }
    
    _takeIt() {
        let message = `You take ${this.components[0].name} hamburger with ${this.components[1].name}`,
            toppings = [];
        for (let component of this.components) {
            if (component.category === 'topping') {
                toppings.push(component.name);
            }
        }
        if (toppings.length === 0) {
            alert(`${message}.\nIt cost: ${this.cost}rub.\nIt callorie: ${this.calorie}cal.`);
        } else {
            alert(`${message}, ${toppings.join(', ')}.\nIt cost: ${this.cost}rub.\nIt callorie: ${this.calorie}cal.`)
        }
    }
    
    _fetchOrReplaceComponent(component) {
        if (this._isUnique(component) && (this._isTopping(component) || !this._isSameType(component))) {
                this._fetchComponent(component);
            } else {
                this._replaceComponent(component);
            }
    }
    
    _removeTopping(name) {
        if (name === 'no-topping') {
            for (let index = 0; index < this.components.length; index++) {
                if (this.components[index].category === 'topping') {
                    this.components.splice(index, 1);
                    index -= 1;
                }
            }
        } else {
            for (let index = 0; index < this.components.length; index++) {
                if (`no-${this.components[index].name}` === name) {
                    this.components.splice(index, 1);
                    break;
                }
            }
        }
    }    
    
    _getComponentByName(name) {
        return this.allComponents.find((component) => {return component.name === name});
    }
    
    _fetchComponent(newComponent) {
        this.components.push(newComponent);
    }
    
    _isUnique(newComponent) {
        for (let component of this.components) {
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
        for (let component of this.components) {
            if (newComponent.category === component.category) {
                return true;
            }
        }
        return false;
    }
    
    _replaceComponent(newComponent) {
        for (let index = 0; index < this.components.length; index++) {
            if (this._isTopping(this.components[index]) && this.components[index].name === newComponent.name) {
                this.components.splice(index, 1, newComponent);
                break;
            } else if (!this._isTopping(this.components[index]) && this.components[index].category === newComponent.category) {
                this.components.splice(index, 1, newComponent);
                break;
            }
        }
    }
    
    _calculateCostAndCalorie(cost = 0, calorie = 0) {
        for (let component of this.components) {
            cost += component.cost;
            calorie += component.calorie;
        }
        return {cost, calorie};
    }
    
    _render(consistId = 'consist',
                           costId = 'total-cost',
                           calorieId = 'total-calorie') {
        document.getElementById(consistId).innerHTML = this._getComponentsNames();
        document.getElementById(costId).innerHTML = this.cost + 'rub';
        document.getElementById(calorieId).innerHTML = this.calorie + 'cal';
    }
    
    _getComponentsNames() {
        let names = [];
        for (let component of this.components) {
            names.push(component.name);
        }
        return names.join(' ');
    }
}

new Hamburger();