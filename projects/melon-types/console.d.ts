type Console = {
    log(...data: any): void,
    error(...data: any[]): void,
    warn(...data: any[]): void,
    clear(): void,
    table(tabularData?: any, properties?: string[]): void
}

declare const console: Console