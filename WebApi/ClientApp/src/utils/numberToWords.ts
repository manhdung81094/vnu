function capitalizeFirstLetter(str:string) {
    if (!str) return ""; // Xử lý chuỗi rỗng
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const numberToWords = (num: number, afterText?: string) => {
    if (num === 0) return "không";

    const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
    const levels = ["", "nghìn", "triệu", "tỷ"];

    function readTriple(number: number) {
        let hundred = Math.floor(number / 100);
        let ten = Math.floor((number % 100) / 10);
        let unit = number % 10;
        let result = "";

        if (hundred > 0) {
            result += units[hundred] + " trăm ";
            if (ten === 0 && unit > 0) result += "lẻ ";
        }
        if (ten > 1) {
            result += tens[ten] + " ";
            if (unit === 1) result += "mốt ";
            else if (unit === 5) result += "lăm ";
            else if (unit > 0) result += units[unit] + " ";
        } else if (ten === 1) {
            result += "mười ";
            if (unit === 5) result += "lăm ";
            else if (unit > 0) result += units[unit] + " ";
        } else if (unit > 0) {
            result += units[unit] + " ";
        }
        return result.trim();
    }

    let result = "";
    let level = 0;

    while (num > 0) {
        let triple = num % 1000;
        if (triple > 0) {
            let prefix = readTriple(triple);
            if (level > 0) prefix += " " + levels[level] + " ";
            result = prefix + result;
        }
        num = Math.floor(num / 1000);
        level++;
    }
    result = result + (afterText === undefined ? " đồng" : afterText);
    return capitalizeFirstLetter(result.trim());
}
