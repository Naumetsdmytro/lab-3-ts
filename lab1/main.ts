
type ElementType = "leg" | "hypotenuse" | "adjacent angle" | "opposite angle" | "angle";

function triangle(
    value1: number,
    type1: ElementType,
    value2: number,
    type2: ElementType
): string {
    const toRadians = (deg: number): number => deg * (Math.PI / 180);
    const toDegrees = (rad: number): number => rad * (180 / Math.PI);
    
    const MIN_VALUE: number = 1e-6;
    const MAX_VALUE: number = 1e6;
    
    if (value1 <= 0 || value2 <= 0) return "Значення мають бути додатними";
    if (value1 < MIN_VALUE || value1 > MAX_VALUE || value2 < MIN_VALUE || value2 > MAX_VALUE) {
        return "Значення виходять за допустимий діапазон";
    }
    
    let a: number, b: number, c: number, alpha: number, beta: number;
    
    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        a = type1 === "leg" ? value1 : value2;
        c = type1 === "hypotenuse" ? value1 : value2;
        
        if (a >= c) return "Катет не може бути більшим або дорівнювати гіпотенузі";
        
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
        
        if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";
        
        c = a / Math.cos(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        alpha = type1 === "opposite angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        
        if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";
        
        c = a / Math.sin(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        c = type1 === "hypotenuse" ? value1 : value2;
        alpha = type1 === "angle" ? value1 : value2;
        
        if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";
        
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
        beta = 90 - alpha;
    } 
    else {
        return "Невірні дані. Прочитайте інструкції ще раз.";
    }
    
    console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`);
    console.log(`alpha = ${alpha.toFixed(2)}°, beta = ${beta.toFixed(2)}°`);
    return "Успіх!";
}

console.log(triangle(7, "leg", 18, "hypotenuse"));
console.log(triangle(60, "opposite angle", 5, "leg"));
console.log(triangle(43.13, "angle", -2, "hypotenuse"));
console.log(triangle(0.111, "leg", 10109, "leg"));
