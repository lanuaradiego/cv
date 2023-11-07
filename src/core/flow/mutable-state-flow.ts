import StateFlow from "./state-flow";

export default class MutableStateFlow<T> implements StateFlow<T> {
    private value: T;
    private subscribers: ((value: T) => void)[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    getValue(): T {
        return this.value;
    }

    setValue(newValue: T): void {
        this.value = newValue;
        this.notifySubscribers();
    }

    subscribe(callback: (value: T) => void): void {
        this.subscribers.push(callback);
        callback(this.value);
    }

    unsubscribe(callback: (value: T) => void): void {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
    }

    [Symbol.dispose](): void {
        this.dispose();
    }

    dispose() {
        this.subscribers = [];
    }

    private notifySubscribers() {
        for (const subscriber of this.subscribers) {
            subscriber(this.value);
        }
    }
}