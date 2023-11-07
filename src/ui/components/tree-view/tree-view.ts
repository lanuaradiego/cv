export default class TreeView {
    public readonly htmlElement: HTMLTreeViewElement;

    constructor(
        htmlElement: HTMLUListElement,
    ) {
        if (!(htmlElement instanceof HTMLUListElement))
            throw Error("Invalid argument htmlElement: Must be an HTMLUListElement");
        if (htmlElement.className.indexOf("component-tree-view") == -1)
            htmlElement.className += "component-tree-view";

        this.toTreeViewElement(htmlElement);
        this.htmlElement = htmlElement as HTMLTreeViewElement;
    }

    private toTreeViewElement(ul: HTMLUListElement): ul is HTMLTreeViewElement {
        (ul as HTMLTreeViewElement)._objRef = this;
        return true;
    }

    addItem(item: TreeViewItem): HTMLLIElement | TreeView;
    addItem(text: string): HTMLLIElement;
    addItem(text: string, note: string): HTMLLIElement;
    addItem(text: string, note: string, treeview: TreeView): TreeView;
    addItem(text: string, treeview: TreeView): TreeView;
    addItem(textOrItem: string | TreeViewItem, noteOrTree?: string | TreeView, tree?: TreeView): HTMLLIElement | TreeView {
        let text: string,
            note: string | null = null,
            treeView: TreeView | null = null;

        if (typeof textOrItem === "object") {
            text = textOrItem.text;
            note = textOrItem.note ? textOrItem.note : null;
            treeView = textOrItem.treeview ? textOrItem.treeview : null;
        }
        else {
            text = textOrItem;
        }

        if (typeof noteOrTree === "string") {
            note = noteOrTree;
            if (tree instanceof TreeView)
                treeView = tree;
        }
        else if (noteOrTree instanceof TreeView)
            tree = noteOrTree;

        return this.addNewItem(text, note, treeView);
    }

    private addNewItem(text: string, note: string | null, tree: TreeView | null): HTMLLIElement | TreeView {
        const li = document.createElement("li");
        li.innerText = text;

        if (note != null) {
            const small = document.createElement("small");
            small.innerText = note;
            li.appendChild(small);
        }

        if (tree != null) {
            li.appendChild(tree.htmlElement);
        }

        this.htmlElement.appendChild(li);
        return tree != null ? tree : li;
    }

    set color(col: string) {
        this.htmlElement.style.color = col;
    }

    get color(): string {
        return this.htmlElement.style.color;
    }

    *getItemIterator(): IterableIterator<TreeView | HTMLLIElement> {
        for (let i = 0; i < this.htmlElement.children.length; i++) {
            const child = this.htmlElement.children[i];
            if (child instanceof HTMLUListElement)
                yield (child as HTMLTreeViewElement)._objRef;
            else if (child instanceof HTMLLIElement)
                yield child;
        }
    }

    get circleColor(): string | "" {
        return getComputedStyle(this.htmlElement).getPropertyValue("--custom-circle-color");
    }

    set circleColor(color: string) {
        this.htmlElement.style.setProperty("--custom-circle-color", color);
    }

    get lineColor(): string | "" {
        return getComputedStyle(this.htmlElement).getPropertyValue("--custom-line-color");
    }

    set lineColor(color: string) {
        this.htmlElement.style.setProperty("--custom-line-color", color);
    }

    static setLineColor(item: TreeView | HTMLLIElement | HTMLElement, color: string): void {
        if (item instanceof TreeView)
            item.lineColor = color;
        else
            item.style.setProperty("--custom-line-color", color);
    }

    static setCircleColor(item: TreeView | HTMLLIElement | HTMLElement, color: string): void {
        if (item instanceof TreeView)
            item.circleColor = color;
        else
            item.style.setProperty("--custom-circle-color", color);
    }

    static setColor(item: TreeView | HTMLLIElement | HTMLElement, color: string): void {
        if (item instanceof TreeView)
            item.color = color;
        else
            item.style.color = color;
    }

    static getText(item: TreeView | HTMLLIElement | HTMLElement): string {
        return item instanceof TreeView ?
            ((item.htmlElement.firstChild as HTMLLIElement).firstChild as Text).textContent! :
            item instanceof HTMLLIElement ? (item.firstChild as Text).textContent! :
                item.innerText;
    }

    static create(): TreeView {
        const ul = document.createElement("ul");
        return new TreeView(ul);
    }
}

export type TreeViewItem = {
    text: string,
    note?: string,
    treeview?: TreeView,
};

type HTMLTreeViewElement = HTMLUListElement & { _objRef: TreeView };