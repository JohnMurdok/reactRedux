export function dateFormat(date, withHours) {
    var yyyy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    return dd + "/" + mm + "/" + yyyy + " " + hours + ":"+minutes;
};

export function ISODateToDate(date){
    return dateFormat(new Date(date));
}
