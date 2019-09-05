import { initAnswer } from '../../types/'
import logger from '../../utils/logger'
import downloadTemplate from '../../utils/download-template'

export default async (): Promise<void> => {
  const { name }: initAnswer = await downloadTemplate()
  logger.success(`download successful`)
}
