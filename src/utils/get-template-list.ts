import { repositorie, templates } from '../types'
import { git_tpl_list_url, pro_name } from '../config'

const request = require('request')
const ora = require('ora')

let templates: templates | null = null

export default async (show: boolean = true) => {
  if (templates) return templates

  const spinner = ora('getting template...')

  if (show) {
    spinner.start()
  }

  const headers = {
    headers: {
      'User-Agent': pro_name
    },
    url: git_tpl_list_url
  }

  const handler = (data: repositorie[]): templates => {
    const tpls: templates = {}

    data.forEach((item: repositorie) => {
      const { name, html_url, default_branch } = item
      tpls[name] = {
        'owner/name': html_url.replace('https://github.com/', ''),
        branch: default_branch
      }
    })

    return tpls
  }

  return new Promise<templates>((resolve, reject) => {
    request(headers, (err: any, res: any, body: string): void => {
      spinner.stop()

      if (err) reject(err)

      const data = JSON.parse(body)
      templates = handler(data)

      resolve(templates)
    })
  })
}
