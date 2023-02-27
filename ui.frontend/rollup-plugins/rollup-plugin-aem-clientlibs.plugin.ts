// @ts-ignore
import clientlibGenerator from 'aem-clientlib-generator'

export type TPluginAemClientlibsArgs = {
  name: string
  context: string
  clientLibRoot: string
  verbose?: boolean
  allowProxy?: boolean
}

const DEFAULT_CLIENTLIB_OPTIONS = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:none'],
  jsProcessor: ['default:none', 'min:none'],
  assets: {
    js: [],
    css: [],
  },
}

const DEFAULT_CLIENTLIB_CONFIG = {
  verbose: true,
}

const isJsFile = (filename: string) => filename.endsWith('.js')
const isCssFile = (filename: string) => filename.endsWith('.css')

export default function aemClientLibs(args: TPluginAemClientlibsArgs) {
  return {
    name: 'aem-clientlibs',
    writeBundle(_options: unknown, bundle: Record<string, object>) {
      const files = Object.keys(bundle)

      const clientLibs = Object.assign(DEFAULT_CLIENTLIB_OPTIONS, {
        allowProxy: args.allowProxy ?? true,
        name: args.name,
        assets: {
          js: files.filter(isJsFile),
          css: files.filter(isCssFile),
        },
      })

      const clientLibsOptions = Object.assign(DEFAULT_CLIENTLIB_CONFIG, {
        context: args.context,
        clientLibRoot: args.clientLibRoot,
        verbose: args.verbose ?? true,
      })

      clientlibGenerator(clientLibs, clientLibsOptions, () => {
        console.log('wrote')
      })
    },
  }
}
