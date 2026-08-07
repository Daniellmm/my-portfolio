import { useEffect } from 'react'

const BLUR_TITLE = 'Come back? — D-CodeHood'

export function useTabTitleBlur() {
    useEffect(() => {
        const originalTitle = document.title

        const showBlurTitle = () => {
            document.title = BLUR_TITLE
        }
        const showOriginalTitle = () => {
            document.title = originalTitle
        }
        const handleVisibilityChange = () => {
            document.title = document.hidden ? BLUR_TITLE : originalTitle
        }

        window.addEventListener('blur', showBlurTitle)
        window.addEventListener('focus', showOriginalTitle)
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            window.removeEventListener('blur', showBlurTitle)
            window.removeEventListener('focus', showOriginalTitle)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            document.title = originalTitle
        }
    }, [])
}
