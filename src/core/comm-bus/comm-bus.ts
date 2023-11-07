import StateFlow from "../flow/state-flow";

export default class CommBus implements Disposable {
    private flows: Map<string, StateFlow<unknown>> = new Map();

    public registerFlow(key: string, flow: StateFlow<unknown>) {
        this.flows.set(String(key), flow);
    }

    public removeFlow(key: string): boolean {
        return this.flows.delete(String(key));
    }

    public getFlow<T>(key: string): StateFlow<T> | null {
        return this.flows.get(key) as StateFlow<T> ?? null;
    }

    public dispatchEvent(event: CustomEvent | Event) {
        document.dispatchEvent(event);
    }

    public subscribeEvent(eventName: string, listener: (e: Event) => void) {
        document.addEventListener(eventName, listener);
    }

    public unsubscribeEvent(eventName: string, listener: (e: Event) => void) {
        document.removeEventListener(eventName, listener);
    }

    public dispose() {
        this.flows.clear();
    }

    [Symbol.dispose](): void {
        this.dispose();
    }
}