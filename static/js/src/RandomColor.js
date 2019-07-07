'use strict';

class RandomColor {
    constructor() {
        this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        this.getColor = this.getColor.bind(this);
    }

    getColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}