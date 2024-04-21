export default function checkStringWithNumberAnswer(answer: string, solution: string) {

    const a = MakeEveryNumberToFloatInString(answer).replace(" ", "")
    const b = MakeEveryNumberToFloatInString(solution).replace(" ", "")

    if (a == b) return true
    return false
}

function MakeEveryNumberToFloatInString(text: string){

    const pattern = /-?\d+(\.\d+)?/g;

    function replaceFunction(text: string)  {
        const FloatNumber = parseFloat(text);
        if (Number.isNaN(FloatNumber)) return text; // cannot parse to float

        return FloatNumber.toFixed(2).toString()
    }

    return text.replace(pattern, replaceFunction)
    
}
