export default function applier<T>(element: T, predicate: (element: T) => void): T {
    predicate(element);
    return element;
}