export const supportedLanguage = (): LanguageDTO[] => {
    return [
        {
            id: 'id',
            name: 'Indonesian'
        },
        {
            id: 'en',
            name: 'English'
        }
    ]
}

export const supportedResolution = (): ResolutionDTO[] => {
    return [
        {
            id: '480p',
            name: '480p'
        },
        {
            id: '720p',
            name: '720p'
        }
    ]
}