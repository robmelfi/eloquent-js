class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y === this.matrix.height) return {done: true};

        let value = {x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)};
        this.x++;
        if (this.x === this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => 0);
for (let {x, y, value} of matrix) {
    console.log(x, y, value);
}

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }

    minus(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);


class Group {
    constructor() {
        this.set = [];
    }

    add(item) {
        if(!this.has(item))
            this.set.push(item);
    }

    delete(item) {
        this.set = this.set.filter(i => i !== item);
    }

    has(item) {
        return this.set.includes(item);
    }

    static from(values) {
        let group = new Group;
        for (let value of values) {
            if(!group.has(value)) {
                group.add(value);
            }
        }
        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));