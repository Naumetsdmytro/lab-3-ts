function triangle(value1, type1, value2, type2) {
    var toRadians = function (deg) { return deg * (Math.PI / 180); };
    var toDegrees = function (rad) { return rad * (180 / Math.PI); };
    var MIN_VALUE = 1e-6;
    var MAX_VALUE = 1e6;
    if (value1 <= 0 || value2 <= 0)
        return "Значення мають бути додатними";
    if (value1 < MIN_VALUE || value1 > MAX_VALUE || value2 < MIN_VALUE || value2 > MAX_VALUE) {
        return "Значення виходять за допустимий діапазон";
    }
    var a, b, c, alpha, beta;
    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        a = type1 === "leg" ? value1 : value2;
        c = type1 === "hypotenuse" ? value1 : value2;
        if (a >= c)
            return "Катет не може бути більшим або дорівнювати гіпотенузі";
        b = Math.sqrt(c * c - a * a);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }
    else if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }
    else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        alpha = type1 === "adjacent angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        if (alpha <= 0 || alpha >= 90)
            return "Неправильне значення кута";
        c = a / Math.cos(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        alpha = type1 === "opposite angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        if (alpha <= 0 || alpha >= 90)
            return "Неправильне значення кута";
        c = a / Math.sin(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        c = type1 === "hypotenuse" ? value1 : value2;
        alpha = type1 === "angle" ? value1 : value2;
        if (alpha <= 0 || alpha >= 90)
            return "Неправильне значення кута";
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
        beta = 90 - alpha;
    }
    else {
        return "Невірні дані. Прочитайте інструкції ще раз.";
    }
    console.log("a = ".concat(a.toFixed(2), ", b = ").concat(b.toFixed(2), ", c = ").concat(c.toFixed(2)));
    console.log("alpha = ".concat(alpha.toFixed(2), "\u00B0, beta = ").concat(beta.toFixed(2), "\u00B0"));
    return "Успіх!";
}
console.log(triangle(7, "leg", 18, "hypotenuse"));
console.log(triangle(60, "opposite angle", 5, "leg"));
console.log(triangle(43.13, "angle", -2, "hypotenuse"));
console.log(triangle(0.111, "leg", 10109, "leg"));
