type Color = 'success' | 'info' | 'warning' | 'error'

export type Toast = {
    id: string
    text: string
    label: string
    variant: Color
    link?: string
}
