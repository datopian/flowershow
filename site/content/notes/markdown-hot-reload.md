# How it is implemented in contentlayer

## Summary
- when contentlayer is run in development mode:
	- contentlayer config file is read and esbuild [watch mode](https://esbuild.github.io/api/#watch) is used to watch for  any changes to it
	- then, config values read from the file are used to generate the output `.contentlayer/generated` folder, but also, along the way, the content folder gets watched for any changes using [Chokidar](https://github.com/paulmillr/chokidar)

## next-contentlayer

Below are the relevant pieces of code with some comments (top-down, i.e. starting from the entry point which in this case is the next-contentlayer plugin, but this could also be contentlayer's dev command) that lead to the explanation of how config file and content files are being watched by contentlayer and how the output folder is being regenerated upon those changes.

packages/next-contentlayer/src/index.ts
https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/next-contentlayer/src/index.ts
```js
import { type NextPluginOptions, runBeforeWebpackCompile } from './plugin.js'

export const defaultPluginOptions: NextPluginOptions = {}

// ⬇️ This is what we used to import and use in next.config.js
export const withContentlayer = createContentlayerPlugin(defaultPluginOptions)

// ⬇️ This is the factory function that returns the Next.js plugin
export const createContentlayerPlugin =
  (pluginOptions: NextPluginOptions = defaultPluginOptions) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    return {
      ...nextConfig,
      // ...
      webpack(config: webpack.Configuration, options: any) {
        // ⬇️❗️ THIS IS THE ENTRY POINT FOR GENERATING THE OUTPUT .contentlayer/generated AND WATCHING FOR FILE CHANGES TO CONFIG FILE AND CONTENT FOLDER
        config.plugins!.push(new ContentlayerWebpackPlugin(pluginOptions))
        // ...
        return config
      },
    }
  }

class ContentlayerWebpackPlugin {
  constructor(readonly pluginOptions: NextPluginOptions) {}

  apply(compiler: webpack.Compiler) {
    // `compiler` is the main webpack engine that creates the compilation instance with all the options passed to it
    // it exposes comilation's lifecycle hooks that can be used to execute some code
    // so, below we're running some function before Webpack starts compiling
    compiler.hooks.beforeCompile.tapPromise('ContentlayerWebpackPlugin', async () => {
      // SEE CODE BLOCK BELOW
      await runBeforeWebpackCompile({
        pluginOptions: this.pluginOptions,
        devServerStartedRef,
        // !!! This will be `development` when running `next dev`
        mode: compiler.options.mode,
      })
    })
  }
}
```

packages/next-contentlayer/src/plugin.ts
https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/next-contentlayer/src/plugin.ts
```js
export const runBeforeWebpackCompile = async ({
  mode, // this will be `development` when running `next dev`
  pluginOptions, // empty {}
  devServerStartedRef,
}: {
  mode: WebpackOptionsNormalized['mode']
  pluginOptions: NextPluginOptions
  devServerStartedRef: { current: boolean }
}) => {
  const isNextDev = mode === 'development'
  const isBuild = mode === 'production'
  // `configPath` will be undefined
  const { configPath } = pluginOptions

  if (isBuild) {
    checkConstraints()
    await runContentlayerBuild({ configPath })
  } else if (isNextDev && !devServerStartedRef.current) {
    devServerStartedRef.current = true
    // ⬇️ THIS WILL BE RUN NEXT
    runContentlayerDev({ configPath })
  }
}

const runContentlayerDev = async ({ configPath }: NextPluginOptions) => {
  if (contentlayerInitialized) return
  contentlayerInitialized = true

  await pipe(
    // ⬇️❗️ emit a stream of either Right<Config> (on success) or Left<GetConfigError> (on failure) BUT ALSO watch for changes to the config file! (SEE CODE BLOCK BELOW)
    core.getConfigWatch({ configPath }),
    // (if Right<Config> emitted) log config change message each time it changes (but skip the initial configuration read)
    S.tapSkipFirstRight(() => T.log(`Contentlayer config change detected. Updating type definitions and data...`)),
    // (if Right<Config> emitted) if `disableImportAliasWarning` -> do nothing; else -> validate tsconfig concurrently
    S.tapRight((config) => (config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig))),
    // ⬇️❗️ generate new stream of data each time config changes (cancelling the stream emitted for the previous config) BUT ALSO watch for changes to the content folder! (SEE CODE BLOCK BELOW)
    S.chainSwitchMapEitherRight((config) => core.generateDotpkgStream({ config, verbose: false, isDev: true })),
    S.tap(E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo)),
    S.runDrain, // consume the stream and discard the values
    runMain,
  )
}
```

The term "Right" here refers to the concept of Either type in functional programming languages, where a value is either a "Left" (usually indicating an error or failure case) or a "Right" (usually indicating a success case). The "Right" values are the ones that are processed by this function.

packages/@contentlayer/core/src/getConfig/index.ts
https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/%40contentlayer/core/src/getConfig/index.ts
```js
export type Config = {
  source: SourcePlugin
  esbuildHash: string
  /** File path to the compiled Contentlayer config (usually in `.contentlayer/.cache/_some_version_/...`) */
  filePath: AbsolutePosixFilePath
}

export type SourcePlugin = {
  type: SourcePluginType // local, contentful, sanity ...
  provideSchema: ProvideSchema // a function, that if succeeds, will return SchemaDef
  fetchData: FetchData
} & {
  options: PluginOptions
  extensions: PluginExtensions
}

export type PluginOptions = {
  markdown: MarkdownOptions | MarkdownUnifiedBuilderCallback | undefined
  mdx: MDXOptions | undefined
  date: DateOptions | undefined
  fieldOptions: FieldOptions
  disableImportAliasWarning: boolean
  experimental: PluginOptionsExperimental
}


// will emit a stream of either Right<Config> or Left<GetConfigError>
export const getConfigWatch = ({
  configPath: configPath_,
}: {
  configPath?: string
}): S.Stream<OT.HasTracer & HasCwd & fs.HasFs, never, E.Either<GetConfigError, Config>> => { 
  const resolveParams = pipe(
    T.structPar({ configPath: resolveConfigPath({ configPath: configPath_ }), cwd: getCwd }),
    T.chainMergeObject(() => makeTmpDirAndResolveEntryPoint),
    T.either,
  )

  return pipe(
    S.fromEffect(resolveParams),
    S.chainMapEitherRight(({ configPath, outfilePath, cwd }) =>
      pipe(
        // ⬇️❗️ generates a stream of Config and watches for changes to the config file
        esbuild.makeAndSubscribe({
          entryPoints: [configPath],
          entryNames: '[name]-[hash]',
          outfile: outfilePath,
          sourcemap: true,
          platform: 'node',
          target: 'es2020',
          format: 'esm',
          // needed in case models are co-located with React components
          jsx: 'transform',
          bundle: true,
          logLevel: 'silent',
          metafile: true,
          absWorkingDir: cwd,
          plugins: [contentlayerGenPlugin(), makeAllPackagesExternalPlugin(configPath)],
        }),
        S.mapEffectEitherRight((result) => getConfigFromResult({ result, configPath })),
      ),
    ),
  )
}
```

`esbuild.makeAndSubscribe`: https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/%40contentlayer/core/src/getConfig/esbuild.ts#LL171C1-L171C1 

packages/@contentlayer/core/src/generation/generate-dotpkg.ts
```js
// will emit a stream of either Right<GenerateInfo> or Left<GenerateDotpkgError>
export const generateDotpkgStream = ({
  config, // 
  verbose, // false
  isDev, // this will be true (see above)
}: {
  config: Config
  verbose: boolean
  isDev: boolean
}): S.Stream<
  OT.HasTracer & HasClock & HasCwd & HasConsole & fs.HasFs,
  never,
  E.Either<GenerateDotpkgError, GenerateInfo>
> => {
  const writtenFilesCache = {}
  const generationOptions = { sourcePluginType: config.source.type, options: config.source.options }
  const resolveParams = pipe(
    T.structPar({
      schemaDef: config.source.provideSchema(config.esbuildHash),
      targetPath: ArtifactsDir.mkdir,
    }),
    T.either,
  )

  return pipe(
    S.fromEffect(resolveParams),
    S.chainMapEitherRight(({ schemaDef, targetPath }) =>
      pipe(
        // ⬇️❗️ this is the part that ultimately fatches files and watches for their changes
        config.source.fetchData({ schemaDef, verbose }),
        S.mapEffectEitherRight((cache) =>
          pipe(
            writeFilesForCache({ config, schemaDef, targetPath, cache, generationOptions, writtenFilesCache, isDev }),
            T.eitherMap(() => ({ documentCount: Object.keys(cache.cacheItemsMap).length })),
          ),
        ),
      ),
    ),
  )
}
```

packages/@contentlayer/source-files/src/fetchData/index.ts
https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/%40contentlayer/source-files/src/fetchData/index.ts#L16
```js
// ...
import { FSWatch } from '@contentlayer/utils/node'

// ...

    FSWatch.makeAndSubscribe(watchPaths, {
      cwd: contentDirPath,
      ignoreInitial: true,
      ignored: contentDirExclude as unknown as string[], // NOTE type cast needed because of readonly array
      // Unfortunately needed in order to avoid race conditions
      awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 10 },
    }),
    S.mapEitherRight(chokidarAllEventToCustomUpdateEvent),
  )

// ...
```

`FSWatch.makeAndSubscribe`:
https://github.com/contentlayerdev/contentlayer/blob/024d387c249daf6429406201d60dc58762356a35/packages/%40contentlayer/utils/src/node/fs-watcher.ts#L248: generates a stream of FileSystemEvent and watch for files changes with Chokidar (https://github.com/paulmillr/chokidar)
