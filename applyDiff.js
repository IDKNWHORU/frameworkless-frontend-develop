const isNodeChanged = (virtual, real) => {
    const virtualAttributes = virtual.attributes;
    const realAttributes = real.attributes;

    if (virtualAttributes.length !== realAttributes.length) {
        return true;
    }

    const differentAttributes = [...virtualAttributes].find(attr => {
        const { name } = attr;
        const attribute1 = virtual.getAttribute(name);
        const attribute2 = real.getAttribute(name);

        return attribute1 !== attribute2;
    });

    if (differentAttributes) {
        return true;
    }

    if (virtual.children.length === 0 && real.children.length === 0 && virtual.textContent !== real.textContent) {
        return true;
    }

    return false;
}

const applyDiff = (dom, real, virtual) => {
    if (real && !virtual) {
        real.remove();
        return;
    }

    if (!real && virtual) {
        dom.appendChild(virtual);
        return;
    }

    if (isNodeChanged(virtual, real)) {
        real.replaceWith(virtual);
        return;
    }

    const realChild = [...real.children];
    const virtualChild = [...virtual.children];

    const max = Math.max(realChild.length, virtualChild.length);

    for (let i = 0; i < max; i++) {
        applyDiff(real, realChild[i], virtualChild[i]);
    }
}

export default applyDiff;