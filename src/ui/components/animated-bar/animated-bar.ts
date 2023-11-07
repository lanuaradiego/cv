export default class AnimatedBar {

    constructor(
        public readonly htmlElement: HTMLDivElement,
    ) {
        if (!(htmlElement instanceof HTMLDivElement))
            throw Error("Invalid argument htmlElement: Must be an HTMLDivElement");
    }

    get text(): string {
        const txt = getComputedStyle(this.htmlElement).getPropertyValue("--custom-text");
        return txt.length < 2 ? txt : txt.substring(1, txt.length - 1);      // remove single quotes
    }

    set text(text: string) {
        this.htmlElement.style.setProperty("--custom-text", `'${text}'`);   // add single quotes
    }

    set value(value: 0 | number | 100) {
        if (typeof value == "number" && value >= 0 && value <= 100) {
            this.htmlElement.style.setProperty("--custom-value", `${value}%`);  // add %
        }
    }

    get value(): 0 | number | 100 {
        const value = getComputedStyle(this.htmlElement).getPropertyValue("--custom-value");
        return value.length == 0 ? 0 : parseFloat(value.substring(0, value.length - 1));    // remove %
    }

    public static create(text: string, progress: 0 | number | 100): AnimatedBar {
        const htmlElement = document.createElement("div");
        htmlElement.className = "component-animated-bar";
        const bar = new AnimatedBar(htmlElement);
        bar.text = text;
        bar.value = progress;
        return bar;
    }
}