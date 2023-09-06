export const DEFAULT_SETTINGS = [
    {
        id: 'screen',
        name: 'Écran',
        settings: [
            {
                id: 'keepScreenAwake',
                name: 'Garder l\'écran allumé',
                isActive: true
            }
        ]
    },
    {
        id: 'audio',
        name: 'Audio',
        settings: [
            {
                id: 'menuMusic',
                name: 'Musique (menu)',
                isActive: true
            }
        ]
    },
    {
        id: 'advanced',
        name: 'Avancé',
        settings: [
            {
                id: 'jsonWizard',
                name: 'Activer JSON Wizard', 
                isActive: false
            }
        ]
    }
]