#!/usr/bin/env node

const inquirer = require('inquirer')

const chalk = require('chalk')

const fs = require('fs')

const pages = require(`${__dirname}/../pages`)

const question = [
    {
        name: 'name',
        type: 'input',
        message: '请输入页面名称(英文)',
        validate(val) {
            if (val === '') {
                return '页面名称为必填'
            } else if (pages.find(item => item.name === val)) {
                return '页面名称已存在'
            } else {
                return true
            }
        }
    },
    {
        name: 'title',
        type: 'input',
        message: '请输入页面标题(中文)',
        validate(val) {
            if (val === '') {
                return '页面名称为必填'
            } else if (pages.find(item => item.title === val)) {
                return '页面标题已存在'
            } else {
                return true
            }
        }
    }
]

inquirer.prompt(question).then(answers => {
    const { name, title } = answers
    console.log(
        `你输入的名称是：${name}，命令路径是${__dirname}，当前路径是${process.cwd()}`
    )
})
