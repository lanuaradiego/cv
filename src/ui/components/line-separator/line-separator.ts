export default function addLineSeparator(parent: HTMLElement): void {
    const hr = document.createElement("hr");
    hr.className = "line-separator";
    parent.appendChild(hr);
}