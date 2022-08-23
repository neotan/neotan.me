import { useEffect } from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import { useHotkeys } from 'react-hotkeys-hook'
import { isBrowser } from '~/utils/helpers'

type ModalHeaderProps = HTMLAttributes<HTMLDivElement>

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        aria-label="Modal Header"
        className={twMerge('mb-8 text-xl', className)}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  },
)

ModalHeader.displayName = 'ModalHeader'

type ModalBodyProps = HTMLAttributes<HTMLDivElement>

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        aria-label="Modal Body"
        className={twMerge(
          'max-h-[calc(100vh_-_5rem)] w-full overflow-y-hidden',
          className,
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  },
)

ModalBody.displayName = 'ModalBody'

type ModalFooterProps = HTMLAttributes<HTMLDivElement>

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        aria-label="Modal Footer"
        className={twMerge(
          'flex w-full items-center justify-end px-4 py-2',
          className,
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  },
)

ModalFooter.displayName = 'ModalFooter'

function toggleBodyScroll(modalOpen: boolean, modalId: string) {
  const keepItScrollable = document.querySelector(`#${modalId}`)

  if (modalOpen) {
    disableBodyScroll(keepItScrollable)
  } else {
    enableBodyScroll(keepItScrollable)
  }
}

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  open?: boolean
  responsive?: boolean
  backdropClass?: string
  onClickBackdrop?: () => void
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      id,
      children,
      className,
      backdropClass,
      open,
      responsive,
      onClickBackdrop,
      ...props
    },
    forwardedRef,
  ) => {
    useHotkeys('alt+q', onClickBackdrop)
    useEffect(() => {
      if (isBrowser()) {
        toggleBodyScroll(open, id)
        return clearAllBodyScrollLocks
      }
    }, [open, id])

    return (
      <div
        id={id}
        aria-label="Modal"
        aria-hidden={!open}
        aria-modal={open}
        className={twMerge(
          'pointer-events-none fixed top-0 right-0 left-0 bottom-0 z-[999] flex items-center justify-center overflow-hidden bg-gray-500  bg-opacity-30 opacity-0 backdrop-blur-md transition-opacity',
          backdropClass,
          clsx({
            'pointer-events-auto visible opacity-100': open,
            'items-end sm:items-center': responsive,
          }),
        )}
        onClick={e => {
          e.stopPropagation()
          if (e.target === e.currentTarget) {
            // ignored events emitted by other elements
            onClickBackdrop?.()
          }
        }}
      >
        <div
          {...props}
          className={twMerge(
            'flex max-h-[60vh] w-[40rem] flex-col items-center justify-center rounded-xl',
            className,
          )}
          ref={forwardedRef}
        >
          {children}
        </div>
      </div>
    )
  },
)

Modal.displayName = 'Modal'

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
})
