export const formatPhone = (value) => {
    const numbers = value.toString().replace(/\D/g, '');
    const match = numbers.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);
    if (match) {
        return `(${match[1]}${match[2] ? ') ' : ''}${match[2] ? match[2] : ''}${match[3] ? '-' : ''}${match[3] ? match[3] : ''}`;
    }
    return value;
}