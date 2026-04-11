import config from './gui-config/gui.config'

type Conf = typeof config

declare module '@hanzo/gui' {
  interface GuiCustomConfig extends Conf {}
}
