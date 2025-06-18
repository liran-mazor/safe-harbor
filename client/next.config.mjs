export function webpack(config, { dev }) {
  if (dev) {
    config.watchOptions = {
      poll: false,
      aggregateTimeout: 300,
    }
  }
  return config
}