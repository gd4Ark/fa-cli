import logger from '../../utils/logger'
import downloadTemplate from '../../utils/download-template'

export default async (): Promise<void> => {
  await downloadTemplate()
  logger.success(`download successful`)
}
