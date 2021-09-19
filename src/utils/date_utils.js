function getCurrentTimestamp() {
    const newDate = new Date();
    const fullYear = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const date = newDate.getDate().toString().padStart(2, '0');
    const hour = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');
    const second = newDate.getSeconds().toString().padStart(2, '0');

    return `${fullYear}-${month}-${date} ${hour}:${minute}:${second}`;
}

export {
    getCurrentTimestamp,
};
