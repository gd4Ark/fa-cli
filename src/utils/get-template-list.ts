import { Repositorie, Templates } from '../types'
import { GIT_TPL_LIST_URL, PRO_NAME } from '../config'

const request = require('request')
const ora = require('ora')

let templates: Templates | null = null

export default async (show: boolean = true): Promise<Templates> => {
  if (templates) return templates

  const spinner = ora('getting template...')

  if (show) {
    spinner.start()
  }

  const headers = {
    headers: {
      'User-Agent': PRO_NAME
    },
    url: GIT_TPL_LIST_URL
  }

  const handler = (data: Repositorie[]): Templates => {
    const tpls: Templates = {}

    data.forEach((item: Repositorie) => {
      const { name, html_url, default_branch } = item
      tpls[name] = {
        'owner/name': html_url.replace('https://github.com/', ''),
        branch: default_branch
      }
    })

    return tpls
  }

  return new Promise<Templates>((resolve, reject): void => {
    request(headers, (err: any, res: any, body: string): void => {
      spinner.stop()

      if (err) reject(err)

      const data = JSON.parse(body)
      templates = handler(data)

      resolve(templates)
    })
  })
}
