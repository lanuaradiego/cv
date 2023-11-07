export default interface StateFlow<T> extends Disposable {
    getValue(): T;
    subscribe(callback: (value: T) => void): void;
    unsubscribe(callback: (value: T) => void): void;
    dispose(): void;
}