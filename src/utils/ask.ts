import { obj, arr } from '../types'

const async = require('async')
const { prompt } = require('inquirer')

export default (prompts: obj, data: arr, done: any): void => {
  async.eachSeries(
    Object.keys(prompts),
    (key: number, next: any) => {
      promptFn(data, key, prompts[key], next)
    },
    done
  )
}

const promptFn = (data: arr, key: number, promptData: obj, done: any): void => {
  promptsFn(key, promptData, (answers: any[]) => {
    const answer = answers[key]
    if (promptData.children && !!answer) {
      data[key] = []
      childrenAsk(data, key, promptData.children, done)
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

const promptsFn = (key: number, promptData: obj, done: any): void => {
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
  ]).then((answers: any[]) => {
    done(answers)
  })
}

const childrenAsk = (data: arr, key: number, prompts: arr, done: any): void => {
  let temp = {}
  async.eachSeries(
    Object.keys(prompts),
    (key: number, next: any) => {
      promptsFn(key, prompts[key], (answers: arr) => {
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
      ]).then((msg: any) => {
        data[key].push(temp)
        if (msg.continue) {
          childrenAsk(data, key, prompts, done)
        } else {
          done()
        }
      })
    }
  )
}
