const request = require('request')
const ora = require('ora')
const chalk = require('chalk')
const { templateUrl } = require('../../config')
let gitList = null
module.exports = (show = true) => {
    if (gitList) return gitList
    const spinner = ora('查询模板中...')
    if (show) {
        spinner.start()
    }
    return new Promise((resolve, reject) => {
        request(
            {
                headers: {
                    'User-Agent': 'suixin-cli'
                },
                url: templateUrl
            },
            (err, res, body) => {
                spinner.stop()
                if (err) reject(err)
                const data = JSON.parse(body)
                const arr = {}
                data.forEach(item => {
                    const { name, html_url, default_branch } = item
                    arr[name] = {
                        'owner/name': html_url.replace(
                            'https://github.com/',
                            ''
                        ),
                        branch: default_branch
                    }
                })
                gitList = arr
                resolve(arr)
            }
        )
    })
}
