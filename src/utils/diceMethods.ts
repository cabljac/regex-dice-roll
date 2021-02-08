export const validateExpression = (expression: string) => {

    const initialConstRe = /^\/r [+-]*\d+(?!\d*d)/g
    const initialDiceRe = /\/r [+-]*(\d*d\d+)/g

    if (initialConstRe.test(expression)) {
        var initialConstMatch = expression.match(initialConstRe)?.map((ex) => ex.replace(/^\/r /g, "")) ?? []
        var withoutPrefix = expression.replace(initialConstRe, "").replaceAll(" ", "")

        const myRe2 = /[+-]\d+(?!\d*d)/g
        const myRe = /([+-]\d*d\d+)/g

        var dice = withoutPrefix.match(myRe)?.concat([]) ?? []
        var constantsMatch = withoutPrefix.match(myRe2)?.concat([]) ?? []
        var constants = initialConstMatch.concat(constantsMatch)
    } else {
        var initialDiceMatch = expression.match(initialDiceRe)?.map((ex) => ex.replace(/^\/r /g, "")) ?? []
        var withoutPrefix = expression.replace(initialDiceRe, "").replaceAll(" ", "")

        const myRe2 = /[+-]\d+(?!\d*d)/g
        const myRe = /([+-]\d*d\d+)/g

        var diceMatch = withoutPrefix.match(myRe)?.concat([]) ?? []
        var constants = withoutPrefix.match(myRe2)?.concat([]) ?? []
        var dice = initialDiceMatch.concat(diceMatch)
    }




    return [dice, constants]
}

export const rollTheDice = (dice: string[], constants: string[]) => {


    const summedConstants = constants.map((st) => parseInt(st)).reduce((a, b) => a + b, 0)
    const translatedDice = dice.map((diceString) => diceString.split("d").map(st => parseInt(st)));

    var rolledDice = 0
    if (translatedDice.length > 0) {
        rolledDice = translatedDice.map((couple) => {
            let result = 0;
            for (let i = 0; i < couple[0]; i++) {
                let a = Math.floor(Math.random() * couple[1]) + 1;
                console.log(a);

                result += a
            }
            return result;
        })[0]
    }
    return rolledDice + summedConstants
}

export const checkIfCommand = (expression: string) => {
    var initialRe = /^\/r [+-]*\d+(?!\d*d)|\/r [+-]*(\d*d\d+)/g
    var noOtherCharsRe = /^(\/r)[^a-be-z]*$/g

    var isCommand = initialRe.test(expression) && noOtherCharsRe.test(expression)

    return isCommand
}

