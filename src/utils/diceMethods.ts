export const validateExpression = (expression: string) => {

    var initialRe = /^\/r [+-]*\d+(?!\d*d)|\/r [+-]*(\d*d\d+)/g

    var initialMatch = expression.match(initialRe)?.map((ex) => ex.replace(/^\/r /g, "")) ?? []

    var withoutPrefix = expression.replace(initialRe, "").replaceAll(" ", "")


    var myRe2 = /[+-]\d+(?!\d*d)/g
    var myRe = /([+-]\d*d\d+)/g

    var match = withoutPrefix.match(myRe) ?? []
    var constants = withoutPrefix.match(myRe2)?.concat([]) ?? []

    var dice = initialMatch.concat(match)
    return [dice, constants]
}

export const rollTheDice = (dice: string[], constants: string[]) => {

    const summedConstants = constants.map((st) => parseInt(st)).reduce((a, b) => a + b, 0)
    const translatedDice = dice.map((diceString) => diceString.split("d").map(st => parseInt(st)));

    const rolledDice = translatedDice.map((couple) => {
        let result = 0;
        for (let i = 0; i < couple[0]; i++) {
            let a = Math.floor(Math.random() * couple[1]) + 1;
            console.log(a);

            result += a
        }
        return result;
    })[0]

    return rolledDice + summedConstants
}

export const checkIfCommand = (expression: string) => {
    var initialRe = /^\/r [+-]*\d+(?!\d*d)|\/r [+-]*(\d*d\d+)/g
    var noOtherCharsRe = /^(\/r)[^a-be-z]*$/g

    var isCommand = initialRe.test(expression) && noOtherCharsRe.test(expression)

    return isCommand
}

