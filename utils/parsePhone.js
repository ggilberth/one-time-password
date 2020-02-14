module.export = function(phone) {
    return String(phone).replace(/[^\d]/g, "")
}