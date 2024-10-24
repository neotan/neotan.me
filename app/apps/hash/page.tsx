'use client'

import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  createRef,
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { useAsync, useLocalStorageValue, } from '@react-hookz/web'
import { formatDuration } from 'date-fns/formatDuration'
import { intervalToDuration } from 'date-fns/intervalToDuration'
import { IHasher } from 'hash-wasm/lib/WASMInterface'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as hashAlgos from 'https://cdn.skypack.dev/hash-wasm'
import prettyBytes from 'pretty-bytes'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDropzone } from 'react-dropzone'
import { BsTextLeft } from 'react-icons/bs'
import {
  FiCheckSquare,
  FiCopy,
  FiInfo,
  FiZap
} from 'react-icons/fi'
import { ImFilesEmpty } from 'react-icons/im'

import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn, formatDate, isNilOrEmpty } from '@/lib/utils'

import type { FileWithPath } from 'react-dropzone'


const APP_NAME = 'wasm-hash'

const DEFULT_HASH_NAMES: Record<string, boolean> = {
  crc32: true,
  md5: true,
  sha1: true,
  sha2: true,
  sha3: true,
  sha256: true,
  sha512: true,
}

const hashers: Record<string, {
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

type AlgoName = keyof typeof hashers

const HASH_NAMES = Object.keys(hashers)

type InputFormats = 'inputText' | 'inputFiles'

export default function HashHome() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [startedAt, setStartedAt] = useState<Date | null>(null)
  const [endedAt, setEndedAt] = useState<Date | null>(null)

  const textHasherRefs = useRef<Record<string, RefObject<{ execute: () => Promise<void> }>>>({})
  HASH_NAMES.forEach((hashName) => (textHasherRefs.current[hashName] = createRef()))

  const fileHasherRefs = useRef<Record<string, RefObject<{ execute: () => Promise<void> }>>>({})
  HASH_NAMES.forEach(hashName => (fileHasherRefs.current[hashName] = createRef()))

  let {
    value: selectedHashNames,
    set: setSelectedHashNames
  } = useLocalStorageValue(`${APP_NAME}-selected-hashes`, {
    defaultValue: DEFULT_HASH_NAMES
  })
  selectedHashNames ??= {}

  let {
    value: rawText,
    set: setRawText
  } = useLocalStorageValue<string>(
    `${APP_NAME}-raw-text`,
    { defaultValue: '' },
  )
  rawText ??= ''

  const {
    value: selectedFormat,
    set: setSelectedFormat
  } = useLocalStorageValue<InputFormats>(`${APP_NAME}-input-format`, {
    defaultValue: 'inputText'
  })

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setStartedAt(null)
    setEndedAt(null)
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted })

  function onCheckboxClick(id: string, checked: boolean) {
    setSelectedHashNames({ ...selectedHashNames, [id]: checked })
  }

  return (
    <>
      <div className=" min-h-screen pt-8">
        <main className="container mx-auto flex gap-8 px-4 lg:max-w-6xl">
          <aside className="bg-mutedxx w-64 border p-4">
            <Button className="w-full" variant="outline" onClick={() => setSelectedHashNames(DEFULT_HASH_NAMES)}>
              Reset
            </Button>
            <ul className="menu mt-4 overflow-y-auto scrollbar-thin" role='menu'>
              {Object.values(hashers)?.map(({ id, title }) => {
                return (
                  <li key={id} className="font-heading cursor-pointer" role='menuitem'>
                    <label className="flex cursor-pointer items-center justify-between !p-2 text-lg hover:bg-card">
                      <span>{title}</span>
                      {mounted &&
                        <Checkbox
                          className="!border-primary/20"
                          color="primary"
                          checked={!!selectedHashNames[id]} // to make sure the checkbox is refrected the value
                          data-value={id}
                          onCheckedChange={(checked: boolean) => onCheckboxClick(id, checked)}
                        />}
                    </label>
                  </li>
                )
              })}
            </ul>
          </aside>
          <div className="flex w-full flex-col items-center gap-6 border p-4">
            <div className='w-full'>
              <Tabs defaultValue="inputFiles" className="" onValueChange={(val) => setSelectedFormat(val as InputFormats)}>
                <TabsList className="grid h-auto w-full grid-cols-2 p-2">
                  <TabsTrigger className='gap-2 p-2 data-[state="active"]:bg-primary data-[state="active"]:text-primary-foreground' value="inputText">
                    <BsTextLeft className='size-4' /><span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger className='gap-2 p-2 data-[state="active"]:bg-primary data-[state="active"]:text-primary-foreground' value="inputFiles">
                    <ImFilesEmpty className='size-4' /><span>Files</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inputText">
                  <Textarea
                    key='inputText'
                    className={cn(
                      'font-code h-44 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-corner-primary',
                      { 'h-96': Number(rawText?.length) > 300 },
                    )}
                    placeholder='Input text here...'
                    spellCheck={false}
                    defaultValue={rawText}
                    onChange={e => setRawText(e.target?.value)}
                  />
                </TabsContent>
                <TabsContent value="inputFiles">
                  <div
                    key='inputFiles'
                    {...getRootProps()}
                    className={cn('bordered h-[176px] w-full items-center justify-center')}
                  >
                    <input {...getInputProps()} />
                    {isDragActive
                      ? <p className='font-heading text-lg'>Drop the files here ...</p>
                      : (
                        <div className='font-heading flex size-full cursor-pointer flex-col items-center justify-center text-lg'>
                          <div><span className='font-semibold text-primary'>Drag & Drop</span> some files here</div>
                          <span>or</span>
                          <div><span className='font-semibold text-primary'>Click</span> to select files</div>
                        </div>
                      )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            {mounted && selectedFormat === 'inputText' &&
              <Button
                className='h-12 w-full space-x-2 text-lg'
                color="primary"
                disabled={isNilOrEmpty(rawText)}
                onClick={() => Object.values(textHasherRefs.current).forEach(ref => ref.current?.execute())}
              >
                <FiZap /><span>Generate</span>
              </Button>
            }
            {mounted && selectedFormat === 'inputFiles' &&
              <>
                <Button
                  className='h-12 w-full space-x-2 text-lg'
                  color="primary"
                  disabled={isNilOrEmpty(acceptedFiles) || !!(startedAt && !endedAt)}
                  onClick={() => {
                    setStartedAt(new Date())
                    setEndedAt(null)
                    Object.values(fileHasherRefs.current).forEach(ref => ref.current?.execute())
                  }}
                >
                  <FiZap /><span>Generate</span>
                </Button>
                <div className='h-6 align-middle'>
                  {
                    startedAt && endedAt &&
                    `Processing Time: ${formatDuration(intervalToDuration({ start: startedAt, end: endedAt })) || 'less than 1 second'}`
                  }
                </div>
              </>
            }
            <div className="flex w-full flex-col space-y-2 divide-y">
              {mounted && selectedFormat === 'inputText'
                && Object.values(hashers).map(({ id }) => {
                  return (
                    <HashText
                      key={'inputText-' + id}
                      myref={textHasherRefs.current[id]!}
                      className={cn('hidden', { 'grid': selectedHashNames[id] })}
                      algoName={id}
                      rawData={rawText || ''}
                      hasher={hashAlgos[id]}
                    />
                  )
                })}

              {mounted && selectedFormat === 'inputFiles'
                && Object.values(hashers)
                  .map(({ id, hashFileFn }) => {
                    return (
                      <HashFile
                        key={'inputFiles-' + id}
                        ref={fileHasherRefs?.current?.[id]}
                        className={cn('hidden', { 'flex': selectedHashNames[id] })}
                        algoName={id}
                        rawFiles={acceptedFiles}
                        onDone={setEndedAt}
                        createHasher={hashAlgos?.[hashFileFn]}
                      />
                    )
                  })}
            </div>
          </div>
        </main>
      </div >
      <Footer />
    </>
  )
}

interface HashTextProps extends ComponentPropsWithoutRef<'div'> {
  algoName: AlgoName
  rawData: string
  myref: React.RefObject<{ execute: () => Promise<void> }>
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

  return (
    <div className={cn('grid grid-cols-[1fr_4fr] py-5', className)} suppressHydrationWarning>
      <label className='text-md font-heading flex w-36 gap-2'>
        {algoName?.toUpperCase()}
      </label>

      {status === 'not-executed' && null}

      {status === 'error' &&
        <div className='text-md cursor-help' title={error?.message}
        >⚠</div>}

      {status === 'loading' &&
        <div className='text-md pointer-events-none grayscale'
        ><span className='text-md animate-spin'>⚙</span></div>}

      {status === 'success' &&
        <CopyToClipboard
          text={`[${(algoName).toUpperCase()}]: ${result}`}
          onCopy={() => {
            setCopied(true)
            setTimeout(() => { setCopied(false) }, 3000)
          }}>
          <div className="flex w-full items-center justify-between space-x-2 overflow-x-hidden">
            <div className='overflow-x-hidden text-ellipsis px-2 text-gray-500'>
              {result}
            </div>
            {!isNilOrEmpty(result) && (
              <div className="flex space-x-2">
                {isCopied
                  ? <>
                    <span className='text-green-700'>Copied!</span>
                    <FiCheckSquare className="size-6 stroke-green-700" /></>
                  : <FiCopy className="size-6 cursor-pointer stroke-primary" />}
              </div>
            )}
          </div>
        </CopyToClipboard>
      }
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
  const hash = hasher.digest() as string
  return Promise.resolve(hash)

}

interface HashFileProps extends ComponentPropsWithRef<'div'> {
  algoName: keyof typeof hashers
  rawFiles: readonly FileWithPath[]
  onDone: Function
  createHasher: () => Promise<IHasher>
}

const HashFile = forwardRef(function HashFile({ className, algoName, rawFiles, onDone, createHasher }: HashFileProps, ref) {

  const [isCopied, setCopied] = useState(false)
  const [{ status, result, error }, { execute }] = useAsync(async () => {
    let result: string[] = []
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

  return (
    <div className={cn('flex flex-col space-y-4 py-5', className)}>
      <div className="flex justify-between">
        <label className='text-md font-heading flex gap-2'>
          {algoName?.toUpperCase()}
        </label>

        {status === 'success' && (
          <CopyToClipboard
            text={rawFiles?.map((file, idx) => `[${(algoName).toUpperCase()}]-[${file?.name}]: ${result?.[idx]}`).join('  \n')}
            onCopy={() => {
              setCopied(true)
              setTimeout(() => { setCopied(false) }, 3000)
            }}>
            <div className="flex space-x-2">
              {isCopied
                ? <>
                  <span className='text-green-700'>Copied!</span>
                  <FiCheckSquare className="size-6 stroke-green-700" />
                </>
                : <FiCopy className="size-6 cursor-pointer stroke-primary" />}
            </div>
          </CopyToClipboard>
        )}
      </div>

      {!isNilOrEmpty(rawFiles) && (
        <ol className='grow overflow-x-hidden text-ellipsis text-gray-500'>
          {
            rawFiles?.map((file, idx) => {
              const fileName = file?.name
              const hashed = result?.[idx]
              return (
                <li key={fileName} className='grid grid-cols-[2fr_1fr] space-x-4 overflow-hidden px-2 py-1'>
                  <div className='flex grow items-center space-x-2 overflow-hidden text-ellipsis'>
                    <span>{fileName}</span>
                    <div
                      className='cursor-pointer text-sm grayscale'
                      title={`${fileName}\n- size: ${prettyBytes(file.size)}\n- updated: ${formatDate(file.lastModified, 'yyyy-MM-dd H:mm:ss')}`}
                    >
                      <FiInfo className='size-4' />
                    </div>
                  </div>
                  {
                    status === 'loading' &&
                    <div className='flex items-center gap-4'>
                      <span>({prettyBytes(file.size)})</span>
                      <span className='text-md animate-spin text-2xl'>⚙</span>
                    </div>
                  }
                  {
                    status === 'success' &&
                    <div className='overflow-hidden text-ellipsis' title={hashed}>
                      {hashed}
                    </div>
                  }
                </li>
              )
            })
          }
        </ol>)}
    </div>
  )
})
