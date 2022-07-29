export const loadTheme = () => {
    if (process.client) {
        if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }


}

