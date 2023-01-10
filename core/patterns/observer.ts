/**
 * observer software pattern
*/


class Observable {

    observer: Function[]

    constructor() {
        this.observer = [];
    }

    subscribe(new_entity: Function) {
        this.observer.push(new_entity);
    }

    unsubscribe(exist_entity: Function) {
        this.observer = this.observer.filter(fc => fc !== exist_entity);
    }

}


export const observable = new Observable();