import Logger from "../logger/logger";

export default abstract class Screen implements Disposable {
    private parent: HTMLElement | null = null;

    constructor(
        public readonly name: string,
        public readonly url: string,
        protected logger: Logger,
    ) {
        logger.info(`Screen ${name} created`);
        this.onCreate();
    }


    public get parentHtml(): HTMLElement | null {
        return this.parent;
    }

    /** @internal */
    public async attachToParent(newParent: HTMLElement | null) {
        if (this.parent === null) {
            if (newParent !== null) {
                this.parent = newParent;
                await this.loadParentWithUrl(this.parent, this.url);
                this.onAdded(newParent);
                this.logger.info(`Screen ${this.name} added`);
            }
        } else {
            this.removeFromParent();
            if (newParent !== null) {
                this.parent = newParent;
                this.loadParentWithUrl(this.parent, this.url);
                this.onAdded(newParent);
                this.logger.info(`Screen ${this.name} added`);
            }
        }
    }

    public removeFromParent(): void {
        if (this.parent !== null) {
            const oldParent = this.parent;
            this.parent = null;
            this.clearHtmlElement(oldParent);
            this.onRemoved(oldParent);
            this.logger.info(`Screen ${this.name} removed`);
        }
    }

    public abstract onCreate(): void;
    public abstract onAdded(parent: HTMLElement): void;
    public abstract onRemoved(oldParent: HTMLElement): void;
    public abstract onDisposed(): void;

    public dispose(): void {
        this.onDisposed();
        this.logger.info(`Screen ${this.name} disposed`);
    }

    [Symbol.dispose](): void {
        this.onDisposed();
        this.logger.info(`Screen ${this.name} disposed`);
    }

    private async loadParentWithUrl(parent: HTMLElement, url: string) {
        this.logger.info(`Screen ${this.name} downloading url ${url}`);
        parent.innerHTML = await (await fetch(url)).text();
        this.logger.info(`Screen ${this.name} loaded with url ${url}`);
    }

    private clearHtmlElement(element: HTMLElement): void {
        while (element.firstElementChild) {
            element.removeChild(element.firstElementChild);
        }
    }
}