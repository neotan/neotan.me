'use client'

import React, {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  createRef,
  forwardRef,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'


import { useAsync } from '@react-hookz/web'
import { useDebounce } from '@uidotdev/usehooks'
import { formatDuration } from 'date-fns/formatDuration'
import { intervalToDuration } from 'date-fns/intervalToDuration'
import * as hashAlgos from 'hash-wasm'
import { type IHasher } from 'hash-wasm/lib/WASMInterface'
import prettyBytes from 'pretty-bytes'
import { CopyToClipboard } from 'react-copy-to-clipboard-ts'
import { useDropzone } from 'react-dropzone'
import { BsTextLeft } from 'react-icons/bs'
import {
  FiCheckSquare,
  FiCopy,
  FiInfo,
  FiZap,
  FiRotateCcw,
  FiHash
} from 'react-icons/fi'
import { ImFilesEmpty } from 'react-icons/im'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn, formatDate, isNilOrEmpty } from '@/lib/utils'

import type { FileWithPath } from 'react-dropzone'


const DEFAULT_HASH_NAMES: Record<string, boolean> = {
  crc32: true,
  md5: true,
  sha1: true,
  sha256: true,
  sha512: true,
}

const HashingAlgos: Record<string, {
  id: string
  title: string
  hashFileFn: string
}> = {
  adler32: { id: 'adler32', title: 'ADLER32', hashFileFn: 'createAdler32' },
  blake2b: { id: 'blake2b', title: 'BLAKE2B', hashFileFn: 'createBLAKE2b' },
  blake2s: { id: 'blake2s', title: 'BLAKE2S', hashFileFn: 'createBLAKE2s' },
  blake3: { id: 'blake3', title: 'BLAKE3', hashFileFn: 'createBLAKE3' },
  crc32: { id: 'crc32', title: 'CRC32', hashFileFn: 'createCRC32' },
  crc32c: { id: 'crc32c', title: 'CRC32C', hashFileFn: 'createCRC32C' },
  md4: { id: 'md4', title: 'MD4', hashFileFn: 'createMD4' },
  md5: { id: 'md5', title: 'MD5', hashFileFn: 'createMD5' },
  ripemd160: { id: 'ripemd160', title: 'RIPEMD160', hashFileFn: 'createRIPEMD160' },
  sha1: { id: 'sha1', title: 'SHA1', hashFileFn: 'createSHA1' },
  sha224: { id: 'sha224', title: 'SHA224', hashFileFn: 'createSHA224' },
  sha256: { id: 'sha256', title: 'SHA256', hashFileFn: 'createSHA256' },
  sha3: { id: 'sha3', title: 'SHA3', hashFileFn: 'createSHA3' },
  sha384: { id: 'sha384', title: 'SHA384', hashFileFn: 'createSHA384' },
  sha512: { id: 'sha512', title: 'SHA512', hashFileFn: 'createSHA512' },
  sm3: { id: 'sm3', title: 'SM3', hashFileFn: 'createSM3' },
  whirlpool: { id: 'whirlpool', title: 'WHIRLPOOL', hashFileFn: 'createWhirlpool' },
  xxhash128: { id: 'xxhash128', title: 'XXHASH128', hashFileFn: 'createXXHash128' },
  xxhash3: { id: 'xxhash3', title: 'XXHASH3', hashFileFn: 'createXXHash3' },
  xxhash32: { id: 'xxhash32', title: 'XXHASH32', hashFileFn: 'createXXHash32' },
  xxhash64: { id: 'xxhash64', title: 'XXHASH64', hashFileFn: 'createXXHash64' },
} as const

type AlgoName = keyof typeof HashingAlgos

const HASH_NAMES = Object.keys(HashingAlgos)

type InputFormats = 'inputText' | 'inputFiles'

export default function HashHome() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [startedAt, setStartedAt] = useState<Date | null>(null)
  const [endedAt, setEndedAt] = useState<Date | null>(null)

  const textHasherRefs = useRef<Record<string, RefObject<{ execute: () => Promise<void> } | null>>>({})
  HASH_NAMES.forEach((hashName) => (textHasherRefs.current[hashName] = createRef()))

  const fileHasherRefs = useRef<Record<string, RefObject<{ execute: () => Promise<void> } | null>>>({})
  HASH_NAMES.forEach(hashName => (fileHasherRefs.current[hashName] = createRef()))

  const [selectedHashNames, setSelectedHashNames] = useState<Record<string, boolean>>(DEFAULT_HASH_NAMES)
  const [rawText, setRawText] = useState<string>('')
  const [selectedFormat, setSelectedFormat] = useState<InputFormats>('inputText')

  // Debounce the raw text to improve performance during typing
  const debouncedRawText = useDebounce(rawText, 300)

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setStartedAt(null)
    setEndedAt(null)
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted })
  console.log(1111111, isNilOrEmpty(acceptedFiles), acceptedFiles)

  function onCheckboxClick(id: string, checked: boolean) {
    setSelectedHashNames({ ...selectedHashNames, [id]: checked })
  }

  return (
    <>
      <div className={`
        min-h-screen bg-gradient-to-br from-purple-50/50 to-pink-50/50
        dark:from-purple-950/20 dark:to-pink-950/20
      `}>
        {/* Header */}
        <div className="border-b border-purple-200/50 bg-white/80 shadow-sm backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 lg:max-w-6xl">
            <div className="flex items-center gap-3">
              <div className={`
                rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg
              `}>
                <FiHash className="size-6 text-white" />
              </div>
              <div>
                <h1 className={`
                  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold
                  text-transparent
                `}>
                  Hash Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Generate cryptographic hashes with multiple algorithms
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 lg:max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Algorithm Selection Panel */}
            <Card className={`
              border-purple-200/50 bg-white/90 shadow-lg backdrop-blur-sm transition-all
              duration-300
              hover:shadow-xl
              lg:col-span-1
            `}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Algorithms</CardTitle>
                  <Button
                    className={`
                      h-8 cursor-pointer border-purple-200/50 text-xs
                      hover:border-purple-300 hover:bg-purple-50
                    `}
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedHashNames(DEFAULT_HASH_NAMES)}
                  >
                    <FiRotateCcw className="mr-1 size-3" />
                    Reset
                  </Button>
                </div>
                <CardDescription>
                  Select hash algorithms to use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`
                  scrollbar-thin scrollbar-track-purple-50 scrollbar-thumb-purple-200 space-y-2
                  overflow-y-auto
                `}>
                  {Object.values(HashingAlgos)?.map(({ id, title }) => {
                    const isSelected = !!selectedHashNames[id]
                    return (
                      <div key={id} suppressHydrationWarning className={cn(
                        `
                          group flex cursor-pointer items-center justify-between rounded-lg border
                          p-3 transition-all duration-200
                        `,
                        isSelected
                          ? 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm'
                          : `
                            border-gray-200/50 bg-white/50
                            hover:border-purple-200 hover:bg-purple-50/50
                          `
                      )}>
                        <Label className="flex flex-1 cursor-pointer items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            className={`
                              border-purple-300
                              data-[state=checked]:border-purple-500
                              data-[state=checked]:bg-purple-500
                            `}
                            onCheckedChange={(checked: boolean) => onCheckboxClick(id, checked)}
                          />
                          <span className={cn(
                            'font-medium transition-colors',
                            isSelected ? 'text-purple-700' : `
                              text-gray-700
                              group-hover:text-purple-600
                            `
                          )}>
                            {title}
                          </span>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Area */}
            <div className="space-y-6 lg:col-span-3">
              {/* Input Section */}
              <Card className={`
                border-purple-200/50 bg-white/90 shadow-lg backdrop-blur-sm transition-all
                duration-300
                hover:shadow-xl
              `}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 p-2">
                      <BsTextLeft className="size-4 text-purple-600" />
                    </div>
                    Input Data
                  </CardTitle>
                  <CardDescription>
                    Choose your input method and provide data to hash
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    defaultValue="inputText"
                    onValueChange={(val) => setSelectedFormat(val as InputFormats)}
                  >
                    <TabsList className="grid h-auto w-full grid-cols-2 bg-purple-50/50 p-1">
                      <TabsTrigger
                        className={`
                          flex cursor-pointer items-center gap-2
                          data-[state=active]:bg-white data-[state=active]:text-purple-700
                          data-[state=active]:shadow-sm
                        `}
                        value="inputText"
                      >
                        <BsTextLeft className="size-4" />
                        <span>Text</span>
                      </TabsTrigger>
                      <TabsTrigger
                        className={`
                          flex cursor-pointer items-center gap-2
                          data-[state=active]:bg-white data-[state=active]:text-purple-700
                          data-[state=active]:shadow-sm
                        `}
                        value="inputFiles"
                      >
                        <ImFilesEmpty className="size-4" />
                        <span>Files</span>
                      </TabsTrigger>
                    </TabsList>



                    <TabsContent className="mt-4" value="inputText">
                      <div className="space-y-4">
                        <Textarea
                          key="inputText"
                          className={cn(
                            `
                              min-h-32 border-purple-200/50 bg-white/50 transition-all
                              focus:border-purple-400 focus:ring-purple-400/20
                            `,
                            `
                              scrollbar-thin scrollbar-track-purple-50 scrollbar-thumb-purple-200
                              font-mono text-sm
                            `,
                            { 'min-h-48': Number(rawText?.length) > 300 }
                          )}
                          placeholder="Enter your text here to generate hash values..."
                          spellCheck={false}
                          value={rawText}
                          onChange={e => setRawText(e.target?.value)}
                        />
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Characters: {rawText?.length ?? 0}
                          </div>
                          <Button className={`
                            h-6 cursor-pointer border-purple-200/50 text-xs
                            hover:border-purple-300 hover:bg-purple-50
                          `}
                            size="sm"
                            variant="outline"
                            onClick={() => setRawText('')}
                          >
                            <FiRotateCcw className="mr-1 size-3" />
                            Clear Text
                          </Button>
                        </div>
                      </div>
                      <Button
                        className={`
                          group mt-6 h-12 w-full cursor-pointer bg-gradient-to-r from-purple-500
                          to-pink-500 font-medium text-white shadow-lg transition-all duration-300
                          hover:from-purple-600 hover:to-pink-600 hover:shadow-xl
                        `}
                        disabled={isNilOrEmpty(debouncedRawText)}
                        id='generate-hash-values-for-text'
                        onClick={() => Object.values(textHasherRefs.current).forEach(ref => ref.current?.execute())}
                      >
                        <FiZap className="mr-2 size-5 group-hover:animate-pulse" />
                        Generate Hash Values
                      </Button>
                    </TabsContent>

                    <TabsContent className="mt-4" value="inputFiles">
                      <div
                        {...getRootProps()}
                        className={cn(
                          `
                            cursor-pointer rounded-xl border-2 border-dashed p-8 text-center
                            transition-all duration-300
                          `,
                          'bg-gradient-to-br from-purple-50/50 to-pink-50/50',
                          isDragActive
                            ? 'scale-[1.02] border-purple-400 bg-purple-100/50'
                            : 'border-purple-200/50 hover:border-purple-300 hover:bg-purple-50/30'
                        )}
                      >
                        <input {...getInputProps()} />
                        <div className="space-y-3">
                          <div className={`
                            mx-auto flex h-12 w-12 items-center justify-center rounded-xl
                            bg-gradient-to-br from-purple-500 to-pink-500
                          `}>
                            <ImFilesEmpty className="size-6 text-white" />
                          </div>
                          {isDragActive ? (
                            <p className="text-lg font-medium text-purple-700">
                              Drop your files here
                            </p>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-lg font-medium text-gray-700">
                                <span className="text-purple-600">Click to upload</span> or drag files here
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Supports all file types for hash generation, handles files up to <span className=" font-semibold text-purple-600">10GB</span>!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {!isNilOrEmpty(acceptedFiles) && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
                          <div className="max-h-72 space-y-2 overflow-y-auto">
                            {acceptedFiles.map((file, idx) => (
                              <div key={idx} className={`
                                flex items-center justify-between rounded-lg border
                                border-purple-200/50 bg-purple-50/50 p-2
                              `}>
                                <span className="truncate text-sm font-medium">{file.name}</span>
                                <Badge className="text-xs" variant="outline">
                                  {prettyBytes(file.size)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <Button
                          className={`
                            group mt-6 h-12 w-full cursor-pointer bg-gradient-to-r from-purple-500
                            to-pink-500 font-medium text-white shadow-lg transition-all duration-300
                            hover:from-purple-600 hover:to-pink-600 hover:shadow-xl
                          `}
                          disabled={isNilOrEmpty(acceptedFiles)}
                          id='generate-hash-values-for-files'
                          onClick={() => {
                            setStartedAt(new Date())
                            setEndedAt(null)
                            Object.values(fileHasherRefs.current).forEach(ref => ref.current?.execute())
                          }}
                        >
                          <FiZap className="mr-2 size-5 group-hover:animate-pulse" />
                          {(startedAt && !endedAt) ? 'Processing...' : 'Generate Hash Values'}
                        </Button>

                        {startedAt && endedAt && (
                          <div className={`
                            flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-center
                          `}>
                            <FiCheckSquare className="size-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">
                              Processing completed in {formatDuration(intervalToDuration({ start: startedAt, end: endedAt })) || 'less than 1 second'}
                            </span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-purple-200/50 bg-white/90 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 p-2">
                      <FiCheckSquare className="size-4 text-green-600" />
                    </div>
                    Hash Results
                  </CardTitle>
                  <CardDescription>
                    Generated hash values for your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFormat === 'inputText'
                      && Object.values(HashingAlgos).map(({ id }) => {
                        return (
                          <HashText
                            key={'inputText-' + id}
                            algoName={id}
                            className={cn('hidden', { 'block': selectedHashNames[id] })}
                            hasher={(hashAlgos as any)[id]}
                            myref={textHasherRefs.current[id]!}
                            rawData={debouncedRawText || ''}
                          />
                        )
                      })}

                    {selectedFormat === 'inputFiles'
                      && Object.values(HashingAlgos)
                        .map(({ id, hashFileFn }) => {
                          return (
                            <HashFile
                              key={'inputFiles-' + id}
                              ref={fileHasherRefs?.current?.[id]}
                              algoName={id}
                              className={cn('hidden', { 'block': selectedHashNames[id] })}
                              createHasher={(hashAlgos as any)?.[hashFileFn]}
                              rawFiles={acceptedFiles}
                              onDone={setEndedAt}
                            />
                          )
                        })}

                    {Object.keys(selectedHashNames).filter(key => selectedHashNames[key]).length === 0 && (
                      <div className="py-8 text-center text-muted-foreground">
                        <FiHash className="mx-auto mb-2 size-8 opacity-50" />
                        <p>Select algorithms from the sidebar to see results</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

interface HashTextProps extends ComponentPropsWithoutRef<'div'> {
  algoName: AlgoName
  rawData: string
  myref: React.RefObject<{ execute: () => Promise<void> } | null>
  hasher: (rawData: string) => Promise<string>
}


function HashText({ className, algoName, rawData, hasher, myref }: HashTextProps) {
  const [isCopied, setCopied] = useState(false)

  const [{ status, result, error }, { execute }] = useAsync(async () => {
    return isNilOrEmpty(rawData)
      ? Promise.resolve('')
      : hasher?.(rawData)
  })

  useImperativeHandle(myref, () => ({
    execute: () => execute().then(() => { })
  }))

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className={`
        rounded-xl border border-purple-200/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4
        transition-all duration-300
        hover:border-purple-300/50
      `}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              className="border-purple-300/50 bg-white/80 px-3 py-1 font-medium text-purple-700"
              variant="outline"
            >
              {algoName?.toUpperCase()}
            </Badge>
            {status === 'loading' && (
              <div className="flex items-center gap-2 text-purple-600">
                <div className={`
                  h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent
                `} />
                <span className="text-sm font-medium">Generating...</span>
              </div>
            )}
          </div>

          {status === 'success' && result && (
            <CopyToClipboard
              text={`[${algoName?.toUpperCase()}]: ${result}`}
              onCopy={handleCopy}
            >
              <Button
                className={`
                  group h-8 cursor-pointer px-3 transition-all duration-200
                  hover:bg-purple-100/50
                `}
                size="sm"
                variant="ghost"
              >
                {isCopied ? (
                  <>
                    <FiCheckSquare className="mr-2 size-4 text-green-600" />
                    <span className="font-medium text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="mr-2 size-4 text-purple-600 group-hover:text-purple-700" />
                    <span className="text-purple-600 group-hover:text-purple-700">Copy</span>
                  </>
                )}
              </Button>
            </CopyToClipboard>
          )}
        </div>

        {status === 'not-executed' && (
          <div className="py-4 text-center text-muted-foreground">
            <FiHash className="mx-auto mb-2 size-6 opacity-50" />
            <p className="text-sm">Ready to generate hash</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-2 text-red-700">
              <span className="text-lg">⚠️</span>
              <span className="font-medium">Error occurred</span>
            </div>
            <p className="mt-1 text-sm text-red-600" title={error?.message}>
              {error?.message || 'Unknown error'}
            </p>
          </div>
        )}

        {status === 'success' && result && (
          <div className="space-y-2">
            <div className="rounded-lg border-purple-200/50 bg-white/70 p-3">
              <div className="w-full font-mono text-sm break-all text-gray-700 select-all">
                {result}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Length: {result.length} characters
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
const CHUNK_SIZE = 64 * 1024 * 1024

function hashChunk(chunk: any, hasher: IHasher) {
  const fileReader = new FileReader()
  return new Promise<void>((resolve, reject) => {
    fileReader.onload = (e) => {
      const view = new Uint8Array(e.target?.result as ArrayBuffer)
      hasher.update(view)
      resolve()
    }
    fileReader.readAsArrayBuffer(chunk)
  })
}

async function readFile(
  file: File,
  chunkSize: number,
  createHasher: () => Promise<IHasher>
) {
  const hasher = await createHasher()
  hasher.init()
  const numOfChunk = Math.floor(file.size / chunkSize)

  for (let i = 0; i <= numOfChunk; i++) {
    const chunk = file.slice(
      chunkSize * i,
      Math.min(chunkSize * (i + 1), file.size)
    )
    await hashChunk(chunk, hasher)
  }
  const hash = hasher.digest()
  return Promise.resolve(hash)

}

interface HashFileProps extends ComponentPropsWithRef<'div'> {
  algoName: keyof typeof HashingAlgos
  rawFiles: readonly FileWithPath[]
  onDone: Function
  createHasher: () => Promise<IHasher>
}

const HashFile = forwardRef(function HashFile({ className, algoName, rawFiles, onDone, createHasher }: HashFileProps, ref) {
  const [isCopied, setCopied] = useState(false)
  const [isCopiedAll, setCopiedAll] = useState(false)
  const [{ status, result, error }, { execute }] = useAsync(async () => {
    const result: string[] = []
    if (!isNilOrEmpty(rawFiles)) {
      for (const file of rawFiles) {
        const fileBytes = await readFile(file, CHUNK_SIZE, createHasher)
        result.push(fileBytes)
      }
    }
    onDone?.(new Date)
    return result
  })

  useImperativeHandle(ref, () => ({
    execute: () => {
      execute()
    }
  }))

  const handleCopyAll = () => {
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const copyText = rawFiles?.map((file, idx) =>
    `[${algoName?.toUpperCase()}]-[${file?.name}]: ${result?.[idx]}`
  ).join('\n') || ''

  return (
    <div className={cn('space-y-3', className)}>
      <div className={`
        rounded-xl border border-purple-200/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4
        transition-all duration-300
        hover:border-purple-300/50
      `}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              className="border-purple-300/50 bg-white/80 px-3 py-1 font-medium text-purple-700"
              variant="outline"
            >
              {algoName?.toUpperCase()}
            </Badge>
            {status === 'loading' && (
              <div className="flex items-center gap-2 text-purple-600">
                <div className={`
                  h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent
                `} />
                <span className="text-sm font-medium">Processing files...</span>
              </div>
            )}
          </div>

          {status === 'success' && result && result.length > 0 && (
            <CopyToClipboard
              text={copyText}
              onCopy={handleCopyAll}
            >
              <Button
                className={`
                  group h-8 cursor-pointer px-3 transition-all duration-200
                  hover:bg-purple-100/50
                `}
                size="sm"
                variant="ghost"
              >
                {isCopiedAll ? (
                  <>
                    <FiCheckSquare className="mr-2 size-4 text-green-600" />
                    <span className="font-medium text-green-600">Copied All!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="mr-2 size-4 text-purple-600 group-hover:text-purple-700" />
                    <span className="text-purple-600 group-hover:text-purple-700">Copy All</span>
                  </>
                )}
              </Button>
            </CopyToClipboard>
          )}
        </div>

        {status === 'not-executed' && (
          <div className="py-4 text-center text-muted-foreground">
            <ImFilesEmpty className="mx-auto mb-2 size-6 opacity-50" />
            <p className="text-sm">Ready to process files</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-2 text-red-700">
              <span className="text-lg">⚠️</span>
              <span className="font-medium">Processing failed</span>
            </div>
            <p className="mt-1 text-sm text-red-600">
              {error?.message || 'Unknown error occurred during file processing'}
            </p>
          </div>
        )}

        {!isNilOrEmpty(rawFiles) && (
          <div className="space-y-3">
            {rawFiles?.map((file, idx) => {
              const fileName = file?.name
              const hashed = result?.[idx]
              const isProcessing = status === 'loading'
              const isComplete = status === 'success' && hashed

              return (
                <div key={fileName} className={`
                  rounded-lg border border-purple-200/50 bg-white/70 p-4 transition-all duration-200
                `}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="truncate font-medium text-gray-700">{fileName}</span>
                        <Badge className="text-xs whitespace-nowrap" variant="outline">
                          {prettyBytes(file.size)}
                        </Badge>
                      </div>

                      {isComplete && (
                        <div className="space-y-2">
                          <div className={`
                            flex items-center justify-between rounded border border-purple-200/50
                            bg-white p-2
                          `}>
                            <div className="font-mono text-xs break-all text-gray-700 select-all">
                              {hashed}
                            </div>
                            {isComplete && (
                              <CopyToClipboard
                                text={hashed}
                                onCopy={() => {
                                  setCopied(true)
                                  setTimeout(() => setCopied(false), 2000)
                                }}
                              >
                                <Button
                                  className={`
                                    group shrink-0 cursor-pointer p-0 transition-all duration-200
                                    hover:bg-purple-100/50
                                  `}
                                  variant="ghost"
                                >
                                  {isCopied ? (
                                    <>
                                      <FiCheckSquare className="mr-2 size-4 text-green-600" />
                                      <span className="font-medium text-green-600">Copied!</span>
                                    </>
                                  ) : (
                                    <FiCopy className={`
                                      size-4 text-purple-600
                                      group-hover:text-purple-700
                                    `} />
                                  )}
                                </Button>
                              </CopyToClipboard>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="mb-2 text-xs text-muted-foreground">
                              Modified: {formatDate(file.lastModified, 'yyyy-MM-dd H:mm:ss')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Hash length: {hashed?.length || 0} characters
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
})