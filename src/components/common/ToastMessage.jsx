import { Toast } from 'flowbite-react'
import React, { useEffect } from 'react'
import { HiCheck, HiExclamation } from 'react-icons/hi'

const ToastMessage = ({ showToast, message, success, setShowToast }) => {
  useEffect(() => {
    if (!showToast) {
      setShowToast(false)
    }
  }, [showToast])
  return (
    <Toast className={showToast ? '' : 'hidden'}>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        {success ? (
          <HiCheck className="h-5 w-5" />
        ) : (
          <HiExclamation className="h-5 w-5" />
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  )
}

export default ToastMessage
