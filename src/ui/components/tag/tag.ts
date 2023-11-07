export default class Tag {
    private htmlText: HTMLSpanElement;

    constructor(
        public readonly htmlElement: HTMLLIElement
    ) {
        if (!(htmlElement instanceof HTMLLIElement))
            throw Error("Invalid argument htmlElement: Must be an HTMLLIElement");
        if (!(htmlElement.firstChild instanceof HTMLSpanElement) || htmlElement.childElementCount > 1)
            throw Error("Invalid argument htmlElement: Must have only one child of type HTMLSpanElement");
        this.htmlText = htmlElement.firstChild;
    }

    get pointColor(): string | "" {
        return getComputedStyle(this.htmlText).getPropertyValue("--custom-color");
    }

    set pointColor(color: string) {
        this.htmlText.style.setProperty("--custom-color", color);
    }

    get text(): string {
        return this.htmlText.innerText;
    }

    set text(text: string) {
        this.htmlText.innerText = text;
    }

    get onClick(): ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null {
        return this.htmlElement.onclick;
    }

    set onClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
        this.htmlElement.onclick = onclick;
    }

    static create(): Tag {
        const li = document.createElement("li");
        const span = document.createElement("span");
        li.className = "component-tag";
        li.appendChild(span);
        return new Tag(li);
    }
}