type MWorker = {
    result: string,
    callback: Function,
    start: () => void
}

type Std = {
    shift: (value: any) => any,
    system: {
        getBaseFolder: () => string
    },
    path: {
        getFolderPath: (fullPath: string) => string
    },
    workers: {
        add: (name: string, script: string, callback: Function) => void,
        get: (name: string) => MWorker,
        remove: (name: string) => void,
        clear: () => void
    },
    arguments: string[]
}