const math = require('mathjs')

class Generator {
  constructor (argv) {
    this.argv = argv
  }

  randomNum (min, max) {
    return math.randomInt(min, max)
  }

  randomExp (range) {
    let operatorList = ['+', '-', '*', '/']
    let expression = ''
    let expressionLen = this.randomNum(2, 5)
    let bracketsUnclosed = 0
    for (let i = 0; i < expressionLen; i++){
      let partStr = ''
      let operator = operatorList[this.randomNum(0, 4)]
      let frontBrackets = this.randomNum(0, 2)
      let endBrackets = this.randomNum(0, 2)
      if (bracketsUnclosed === 0 || frontBrackets) {
        endBrackets = false
      }
      if (i === (expressionLen - 1)) {
        frontBrackets = false
        operator = ''
      }
      if (frontBrackets) {
        partStr += '('
        bracketsUnclosed++
      }
      partStr += this.randomNum(0, range)
      if (endBrackets) {
        partStr += ')'
        bracketsUnclosed--
      }
      partStr += operator
      expression += partStr
    }
    for (let i = 0; i < bracketsUnclosed; i++) {
      expression += ')'
    }
    return expression
  }

  problemSolver (exp) {
    let expArray = []
    let isNum = false
    let result = null
    exp = exp.split('')
    exp.forEach((item, index) => {
      if (isNaN(parseInt(item))) {
        expArray.push(item)
        isNum = false
      } else {
        item = parseInt(item)
        if (isNum) {
          expArray[expArray.length - 1] = expArray[expArray.length - 1] * 10 + item
        } else {
          expArray.push(item)
        }
        isNum = true
      }
    })
    expArray = this.infixToSuffix(expArray)
    result = this.calcFromSuffix(expArray)
    return result
  }

  calcFromSuffix (suffixArray) {
    let stack = []
    let item = ''
    let length = suffixArray.length
    for (let i = 0; i < length; i++) {
      item = suffixArray.shift()
      if ((typeof item) === 'number') {
        stack.push(item)
      }
      if ((typeof item) === 'string') {
        let secondOperator = stack.pop()
        let firstOperator = stack.pop()
        let formula = firstOperator + item + secondOperator
        stack.push(math.eval(formula))
      }
    }
    return stack[0]
  }

  getPriority (operator) {
    let priority = -1
    const priorityList = [
      {
        operator: '+',
        priority: 0
      },
      {
        operator: '-',
        priority: 0
      },
      {
        operator: '*',
        priority: 1
      },
      {
        operator: '/',
        priority: 1
      },
      {
        operator: '(',
        priority: -1
      },
      {
        operator: ')',
        priority: -1
      }
    ]
    priorityList.forEach((listItem) => {
      if (listItem.operator === operator) {
        priority = listItem.priority
      }
    })
    return priority
  }

  infixToSuffix (infixExp) {
    let stack = []
    let suffixExp = []
    let item = ''
    let length = infixExp.length
    for (let i = 0; i < length; i++) {
      item = infixExp.shift()
      if ((typeof item) == 'number') {
        suffixExp.push(item)
      } else {
        let priority = this.getPriority(item)
        if (item === '(') {
          stack.push(item)
          continue
        }
        if (item === ')') {
          while (stack[stack.length - 1] != '(') {
            suffixExp.push(stack.pop())
          }
          stack.pop()
          continue
        }
        if (stack.length && priority <= this.getPriority(stack[stack.length - 1])) {
          while (stack.length && priority <= this.getPriority(stack[stack.length - 1])) {
            let operator = stack.pop()
            suffixExp.push(operator)
          }
          stack.push(item)
        }
        if (!stack.length || priority > this.getPriority(stack[stack.length - 1])) {
          stack.push(item)
        }
      }
    }
    if (stack.length) {
      suffixExp = suffixExp.concat(stack.reverse())
    }
    return suffixExp
  }

  start () {
    console.log(this.argv)
  }
}

module.exports = Generator
