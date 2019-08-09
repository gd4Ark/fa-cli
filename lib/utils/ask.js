const async = require('async')
const { prompt } = require('inquirer')
module.exports = (prompts, data, done) => {
  async.eachSeries(
    Object.keys(prompts),
    (key, next) => {
      promptFn(data, key, prompts[key], next)
    },
    done
  )
}
const promptFn = (data, key, promptData, done) => {
  promptsFn(key, promptData, answers => {
    const answer = answers[key]
    if (promptData.children && !!answer) {
      data[key] = []
      childrenAsk(data, key, promptData.children, done)
      // ask(children, data[key], done)
    } else {
      if (Array.isArray(answer)) {
        data[key] = {}
        answer.forEach(item => {
          data[key][item] = true
        })
      } else {
        data[key] = answer
      }
      done()
    }
  })
}
const promptsFn = (key, promptData, done) => {
  const { type, message, label, choices, validate = () => true } = promptData
  const promptDefault = promptData.default
  prompt([
    {
      type,
      name: key,
      message: message || label || key,
      choices,
      validate,
      default: promptDefault
    }
  ]).then(answers => {
    done(answers)
  })
}
const childrenAsk = (data, key, prompts, done) => {
  let temp = {}
  async.eachSeries(
    Object.keys(prompts),
    (key, next) => {
      promptsFn(key, prompts[key], answers => {
        temp = Object.assign(temp, answers)
        next()
      })
    },
    () => {
      prompt([
        {
          type: 'confirm',
          name: 'continue',
          message: '是否继续添加数据：',
          default: false
        }
      ]).then(msg => {
        data[key].push(temp)
        console.log(msg)
        if (msg.continue) {
          childrenAsk(data, key, prompts, done)
        } else {
          done()
        }
      })
    }
  )
}
