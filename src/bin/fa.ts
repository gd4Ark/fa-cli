import checkVersion from '../utils/check-version'
import app from '../index'

checkVersion((): void => {
  app()
})
