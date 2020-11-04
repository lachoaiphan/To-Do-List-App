export function appendChildren(parent, children) {
    for (let i = 0; i < children.length; i++) parent.appendChild(children[i]);
}

export function capitalizeString(str) {
    return str.charAt(0).toUpperCase().concat(str.slice(1));
}