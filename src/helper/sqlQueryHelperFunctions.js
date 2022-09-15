exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}
exports.insertIntoColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);
    const fields = Object.keys(object).map((key) => {
        return key = '?';
    })
    columnSet = keys.join(', ');

    return {
        columnSet,
        fields,
        values
    }
}

exports.insertionColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);
    const fields = Object.keys(object).map((key) => {
        return key = '?';
    })

    columnSet = keys.map(key => `${key} = ?`).join(' AND ');

    return {
        columnSet,
        fields,
        values
    }
}
