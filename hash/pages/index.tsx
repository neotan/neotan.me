import {
  useAsync,
  useKeyboardEvent,
  useLocalStorageValue,
} from '@react-hookz/web'
import clsx from 'clsx'
import formatDuration from 'date-fns/formatDuration'
import intervalToDuration from 'date-fns/intervalToDuration'
import purify from 'dompurify'
import { IHasher } from 'hash-wasm/lib/WASMInterface'
//@ts-ignore
import * as hashAlgos from 'https://cdn.skypack.dev/hash-wasm'
import prettyBytes from 'pretty-bytes'
import { includes, keys, map, objOf, pluck, toUpper, uniq, values, without } from 'ramda'
import { createRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import * as React from 'react'
import type { RefObject } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Badge,
  Button,
  Checkbox,
  Indicator,
  Input,
  Swap,
  Tabs,
  Textarea,
  Toggle
} from 'react-daisyui'
import { useDropzone } from 'react-dropzone'
import { BsTextLeft } from 'react-icons/bs'
import {
  FiCheckSquare,
  FiCopy,
  FiHeart,
  FiTrash2,
  FiZap
} from 'react-icons/fi'
import { ImFilesEmpty } from 'react-icons/im'
import type { BaseProps } from 'shared-types'
import { twMerge } from 'tailwind-merge'
import { ClientRenderOnly } from 'ui'
import { formatDate, isNilOrEmpty } from 'utils/helpers'
import { useFuse } from 'utils/hooks'
import Layout from '../components/layout'

const APP_NAME = 'npmhub-hash'

const DEFULT_HASH_NAMES = [
  'crc32',
  'md5',
  'sha1',
  'sha2',
  'sha3',
  'sha256',
  'sha512',
  'sha256',
]

type HasherItem = {
  id: string
  title: string
  description?: string
  createFn: string
}

const hashers: Record<string, HasherItem> = {
  adler32: { id: 'adler32', title: 'ADLER32', description: 'adler32', createFn: 'createAdler32' },
  // argon2: { id: 'argon2', title: 'ARGON2', description: 'argon2' },
  // bcrypt: { id: 'bcrypt', title: 'BCRYPT', description: 'bcrypt' },
  blake2b: { id: 'blake2b', title: 'BLAKE2B', description: 'blake2b', createFn: 'createBLAKE2b' },
  blake2s: { id: 'blake2s', title: 'BLAKE2S', description: 'blake2s', createFn: 'createBLAKE2s' },
  blake3: { id: 'blake3', title: 'BLAKE3', description: 'blake3', createFn: 'createBLAKE3' },
  crc32: { id: 'crc32', title: 'CRC32', description: 'crc32', createFn: 'createCRC32' },
  crc32c: { id: 'crc32c', title: 'CRC32C', description: 'crc32c', createFn: 'createCRC32C' },
  // hmac: { id: 'hmac', title: 'HMAC', description: 'hmac' },
  // keccak: { id: 'keccak', title: 'KECCAK', description: 'keccak' },
  md4: { id: 'md4', title: 'MD4', description: 'md4', createFn: 'createMD4' },
  md5: { id: 'md5', title: 'MD5', description: 'md5', createFn: 'createMD5' },
  // pbkdf2: { id: 'pbkdf2', title: 'PBKDF2', description: 'pbkdf2' },
  ripemd160: { id: 'ripemd160', title: 'RIPEMD160', description: 'ripemd160', createFn: 'createRIPEMD160' },
  // scrypt: { id: 'scrypt', title: 'SCRYPT', description: 'scrypt' },
  sha1: { id: 'sha1', title: 'SHA1', description: 'sha1', createFn: 'createSHA1' },
  sha224: { id: 'sha224', title: 'SHA224', description: 'sha224', createFn: 'createSHA224' },
  sha256: { id: 'sha256', title: 'SHA256', description: 'sha256', createFn: 'createSHA256' },
  sha3: { id: 'sha3', title: 'SHA3', description: 'sha3', createFn: 'createSHA3' },
  sha384: { id: 'sha384', title: 'SHA384', description: 'sha384', createFn: 'createSHA384' },
  sha512: { id: 'sha512', title: 'SHA512', description: 'sha512', createFn: 'createSHA512' },
  sm3: { id: 'sm3', title: 'SM3', description: 'sm3', createFn: 'createSM3' },
  whirlpool: { id: 'whirlpool', title: 'WHIRLPOOL', description: 'whirlpool', createFn: 'createWhirlpool' },
  xxhash128: { id: 'xxhash128', title: 'XXHASH128', description: 'xxhash128', createFn: 'createXXHash128' },
  xxhash3: { id: 'xxhash3', title: 'XXHASH3', description: 'xxhash3', createFn: 'createXXHash3' },
  xxhash32: { id: 'xxhash32', title: 'XXHASH32', description: 'xxhash32', createFn: 'createXXHash32' },
  xxhash64: { id: 'xxhash64', title: 'XXHASH64', description: 'xxhash64', createFn: 'createXXHash64' },
} as const

type AlgoName = keyof typeof hashers

const HASH_NAMES = keys(hashers)
const FUSE_INDEX = values(hashers)

const INPUT_FORMATS = ['inputText', 'inputFiles'] as const
type InputFormats = typeof INPUT_FORMATS[number]

const fuseOptions = {
  keys: ['title', 'description'],
  includeScore: true,
  threshold: 0.6,
}


export default function HashHome() {
  const [searchTerm, setSeachTerm] = useState('')
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
  selectedHashNames ??= []

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

  const searchRef = useRef<HTMLInputElement>(null!)
  useKeyboardEvent('/', e => {
    searchRef.current?.focus()
    e.preventDefault()
  })

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setStartedAt(null)
    setEndedAt(null)
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted })

  let result = useFuse<HasherItem>(FUSE_INDEX, searchTerm, fuseOptions)

  if (!searchTerm?.trim()) {
    result = map(objOf('item'))(FUSE_INDEX) as ReturnType<typeof useFuse<HasherItem>>
  }

  function onCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const updated = (e.target.checked
      ? uniq([...selectedHashNames!, e.target.dataset.value])
      : without([e.target.dataset.value], selectedHashNames!)) as string[]
    setSelectedHashNames(updated)
  }

  function isSelected(inputFormat: InputFormats, algoName: AlgoName) {
    return includes(algoName, selectedHashNames || []) &&
      inputFormat === selectedFormat
  }

  return (
    <Layout>
      <div className="flex sm:space-x-3">
        <aside className="w-64 py-4 text-base-content">
          <div className="group flex items-center space-x-1">
            <Input
              ref={searchRef}
              className="text-md w-10/12 font-heading placeholder:text-gray-500"
              bordered
              size='sm'
              type="search"
              placeholder="Hit '/' to search"
              onChange={e => {
                setSeachTerm(e?.target?.value)
              }}
            />
            <Indicator
              item={
                !isNilOrEmpty(selectedHashNames) && (
                  <ClientRenderOnly>
                    <Badge className="flex rounded-full" size="sm" color="primary">
                      {selectedHashNames?.length}
                    </Badge>
                  </ClientRenderOnly>
                )
              }
            >
              <ClientRenderOnly>
                {(() => {
                  const classes = 'h-7 w-7 cursor-pointer group-hover:z-10 stroke-primary'

                  const trashIcon = <FiTrash2
                    className={classes}
                    title='Clear choosed hash algorithms'
                    onClick={() => setSelectedHashNames([])}
                  />
                  const heartIcon = <FiHeart
                    className={classes}
                    title='Choose commonly used hash algorithms'
                    onClick={() => setSelectedHashNames(DEFULT_HASH_NAMES)}
                  />

                  return (
                    <Swap
                      flip
                      onElement={
                        isNilOrEmpty(selectedHashNames)
                          ? heartIcon
                          : trashIcon
                      }
                      offElement={
                        isNilOrEmpty(selectedHashNames)
                          ? heartIcon
                          : trashIcon
                      }
                    />
                  )
                })()}
              </ClientRenderOnly>
            </Indicator>
          </div>
          <ul className="menu overflow-y-auto scrollbar-thin scrollbar-track-base-100 scrollbar-thumb-base-300" role='menu'>
            {result?.map(({ item: { id, title, description } }) => {
              return (
                <li key={id} className="cursor-pointer font-heading" role='menuitem'>
                  <label className="flex justify-between !p-2 text-lg">
                    <span>{title}</span>
                    <Checkbox
                      className="!border-primary/20"
                      color="primary"
                      size='sm'
                      checked={includes(id, selectedHashNames || [])}
                      data-value={id}
                      title={description}
                      onChange={onCheckboxClick}
                    />
                  </label>
                </li>
              )
            })}
          </ul>
        </aside>
        <div className="flex w-full flex-col items-center space-y-4 py-4">
          <div className='w-full space-y-3 rounded bg-base-200 p-4'>
            <ClientRenderOnly
              fallback={
                <div className="h-40 w-full animate-pulse bg-gray-500/10" />
              }
            >
              <Tabs
                className='p-0'
                size="lg"
                boxed
                value={selectedFormat}
                onChange={setSelectedFormat}
              >
                <Tabs.Tab className='flex-1 space-x-2 !rounded-r-none border-0 bg-base-300/50 font-heading text-xl' value="inputText"><BsTextLeft className='text-2xl' /><span>Text</span></Tabs.Tab>
                <Tabs.Tab className='flex-1 space-x-2 !rounded-l-none border-0 bg-base-300/50 font-heading text-xl' value="inputFiles"><ImFilesEmpty /><span>Files</span></Tabs.Tab>
              </Tabs>
              <Textarea
                key='text'
                className={clsx(
                  'hidden h-44 w-full overflow-y-auto border-base-content/5 font-code scrollbar-thin scrollbar-track-base-200 scrollbar-thumb-primary/30 scrollbar-corner-primary/50 hover:scrollbar',
                  { block: selectedFormat === 'inputText', 'h-96': Number(rawText?.length) > 200 },
                )}
                placeholder='Input text here...'
                spellCheck={false}
                defaultValue={rawText}
                onChange={e => setRawText(e.target?.value)}
              />
              <div
                key='files'
                {...getRootProps()}
                className={clsx(
                  'bordered hidden h-[176px] w-full items-center justify-center bg-base-100',
                  { '!flex': selectedFormat === 'inputFiles' },
                )}
              >
                <input {...getInputProps()} />
                {isDragActive
                  ? <p className='font-heading text-lg text-base-content/50'>Drop the files here ...</p>
                  : (
                    <div className='flex h-full w-full cursor-pointer flex-col items-center justify-center font-heading text-lg text-base-content/50 hover:text-base-content/80'>
                      <div><span className='font-semibold text-primary'>Drag & Drop</span> some files here</div>
                      <span>or</span>
                      <div><span className='font-semibold text-primary'>Click</span> to select files</div>
                    </div>
                  )}
              </div>
            </ClientRenderOnly>
          </div>
          <ClientRenderOnly>
            {selectedFormat === 'inputText' &&
              <Button
                className='w-full space-x-2 text-lg'
                color="primary"
                disabled={isNilOrEmpty(rawText)}
                onClick={() => values(textHasherRefs.current).forEach(ref => ref.current?.execute())}
              >
                <FiZap /><span>Generate</span>
              </Button>
            }
            {selectedFormat === 'inputFiles' &&
              <>
                <Button
                  className='w-full space-x-2 text-lg '
                  color="primary"
                  disabled={isNilOrEmpty(acceptedFiles) || !!(startedAt && !endedAt)}
                  onClick={() => {
                    setStartedAt(new Date())
                    setEndedAt(null)
                    values(fileHasherRefs.current).forEach(ref => ref.current?.execute())
                  }}
                >
                  <FiZap /><span>Generate</span>
                </Button>
                <div className='h-6 align-middle text-base-content/60'>
                  {
                    startedAt && endedAt &&
                    `Processing Time: ${formatDuration(intervalToDuration({ start: startedAt, end: endedAt })) || 'less than 1 second'}`
                  }
                </div>
              </>
            }
          </ClientRenderOnly>
          <div className="flex w-full flex-col space-y-2">
            <ClientRenderOnly>
              {HASH_NAMES.map((algoName) => {
                return (
                  <HashText
                    key={'inputText' + algoName}
                    ref={textHasherRefs.current[algoName]}
                    className={clsx('hidden', { 'flex': isSelected('inputText', algoName) })}
                    algoName={algoName}
                    rawData={rawText || ''}
                    hasher={hashAlgos[algoName]}
                  />
                )
              })}

              {values(hashers).map(({ id, createFn, }) => {
                return (
                  <HashFile
                    key={'inputFiles-' + id}
                    ref={fileHasherRefs?.current?.[id]}
                    className={clsx('hidden', { 'flex': isSelected('inputFiles', id) })}
                    algoName={id}
                    rawFiles={acceptedFiles}
                    onDone={setEndedAt}
                    createHasher={hashAlgos?.[createFn]}
                  />
                )
              })}

              {/* HashText - argon2 */}
              {/* HashFile - argon2 */}
              {/* HashText - bcrypt */}
              {/* HashFile - bcrypt */}
              {/* HashText - hmac */}
              {/* HashFile - hmac */}
              {/* HashText - keccak */}
              {/* HashFile - keccak */}
              {/* HashText - pbkdf2 */}
              {/* HashText - pbkdf2 */}
              {/* HashText - ripemd160 */}
              {/* HashText - ripemd160 */}
              {/* HashText - scrypt */}
              {/* HashText - scrypt */}
            </ClientRenderOnly>
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface HashTextProps extends BaseProps<'div'> {
  algoName: AlgoName
  rawData: string
  hasher: (rawData: string) => Promise<string>
}


const HashText = forwardRef(function HashText({ className, algoName, rawData, hasher }: HashTextProps, ref) {
  const [isCopied, setCopied] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [{ status, result, error }, { execute }] = useAsync(async () => {
    return !enabled || isNilOrEmpty(rawData)
      ? Promise.resolve('')
      : hasher?.(rawData)
  })

  useImperativeHandle(ref, () => ({
    execute: () => {
      console.log('execute()', { algoName, status, error, rawData })
      execute()
    }
  }))

  return (
    <div className={twMerge('bg-base-200 rounded p-5 flex justify-between', className)}>
      <label className={clsx('text-md flex w-36 gap-2 font-heading',
        { 'text-base-content/30': !enabled })}>
        <Toggle
          color="primary"
          size="sm"
          defaultChecked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        {algoName?.toUpperCase()}
      </label>

      {!enabled && <Placeholder className='text-md text-base-content/20 grayscale'
      >🚫</Placeholder>}

      {enabled && status === 'not-executed' && null}

      {enabled && status === 'error' &&
        <Placeholder className='text-md cursor-help text-base-content/20' title={error?.message}
        >⚠</Placeholder>}

      {enabled && status === 'loading' &&
        <Placeholder className='text-md pointer-events-none text-base-content/20 grayscale'
        ><span className='text-md animate-spin'>⚙</span></Placeholder>}

      {enabled && status === 'success' &&
        <CopyToClipboard
          text={`[${toUpper(algoName)}]: ${result}`}
          onCopy={() => {
            setCopied(true)
            setTimeout(() => { setCopied(false) }, 3000)
          }}>
          <div className="flex w-full max-w-xl items-center space-x-2 overflow-x-hidden">
            <div className={clsx(
              'basis-full text-ellipsis px-2 text-gray-500 overflow-x-hidden',
              { 'text-base-content/30': !enabled }
            )}
            >
              {result}
            </div>
            {!isNilOrEmpty(result) && (
              <div className="flex space-x-2 rounded-lg">
                {isCopied
                  ? <>
                    <span className='text-green-700'>Copied!</span>
                    <FiCheckSquare className="h-6 w-6 stroke-green-700" /></>
                  : <FiCopy className="h-6 w-6 cursor-pointer stroke-primary" />}
              </div>
            )}
          </div>
        </CopyToClipboard>
      }
    </div>
  )
})

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

interface HashFileProps extends BaseProps<'div'> {
  algoName: keyof typeof hashers
  rawFiles: File[]
  onDone: Function
  createHasher: () => Promise<IHasher>
}

const HashFile = forwardRef(function HashFile({ className, algoName, rawFiles, onDone, createHasher }: HashFileProps, ref) {

  const [isCopied, setCopied] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [{ status, result, error }, { execute }] = useAsync(async () => {
    let result: string[] = []
    if (enabled && !isNilOrEmpty(rawFiles)) {
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
      console.log('execute()', { algoName, error, rawFiles }), status
      execute()
    }
  }))

  return (
    <div className={twMerge('bg-base-200 rounded p-5 flex flex-col space-y-4', className)}>
      <div className="flex justify-between">
        <label className={clsx('text-md flex gap-2 font-heading',
          { 'text-base-content/30': !enabled })}>
          <Toggle
            color="primary"
            size="sm"
            defaultChecked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          {algoName?.toUpperCase()}
        </label>

        {!enabled && <Placeholder className='text-md text-base-content/20 grayscale'
        >🚫</Placeholder>}

        {enabled && status === 'not-executed' && null}

        {enabled && status === 'error' && <Placeholder className='text-md text-base-content/20 grayscale' title={error?.message}
        >⚠</Placeholder>}

        {enabled && status === 'success' && (
          <CopyToClipboard
            text={rawFiles?.map((file, idx) => `[${toUpper(algoName)}]-[${file?.name}]: ${result?.[idx]}`).join('  \n')}
            onCopy={() => {
              setCopied(true)
              setTimeout(() => { setCopied(false) }, 3000)
            }}>
            <div className="flex space-x-2 rounded-lg">
              {isCopied
                ? <>
                  <span className='text-green-700'>Copied!</span>
                  <FiCheckSquare className="h-6 w-6 stroke-green-700" />
                </>
                : <FiCopy className="h-6 w-6 cursor-pointer stroke-primary" />}
            </div>
          </CopyToClipboard>
        )}
      </div>

      {enabled && !isNilOrEmpty(rawFiles) && (
        <ol className={'grow text-ellipsis text-gray-500 overflow-x-hidden'}
        >
          {
            rawFiles?.map((file, idx) => {
              const fileName = file?.name
              const hashed = result?.[idx]
              return (
                <li key={fileName} className='flex justify-between space-x-4 overflow-hidden rounded px-2 py-1 hover:bg-base-100'>
                  <div className='flex grow items-center space-x-2 overflow-hidden text-ellipsis'>
                    <span>{fileName}</span>
                    <Placeholder
                      className='cursor-pointer text-sm text-base-content/10 grayscale hover:text-base-content/40'
                      rootProps={
                        { title: `${fileName}\n- size: ${prettyBytes(file.size)}\n- updated: ${formatDate(file.lastModified, 'yyyy-MM-dd H:mm:ss')}` }
                      }
                    >ℹ</Placeholder>
                  </div>
                  {
                    status === 'loading' &&
                    <div className='flex items-center'>
                      <span>({prettyBytes(file.size)})</span>
                      <span className='text-md animate-spin'>⚙</span>
                    </div>
                  }
                  {
                    status === 'success' &&
                    <div className='w-[4rem] overflow-hidden text-ellipsis' title={hashed}>
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


function Placeholder({ className, children, rootProps, title }: BaseProps<'div'>) {
  return (
    <div className={twMerge('rounded-md text-center text-base-content/40', className)} title={title}
      {...rootProps}
    >
      {children}
    </div >
  )
}