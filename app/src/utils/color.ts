export function getRandomColor(): string {
    const min = 100
    const rand = () => (Math.floor(Math.random() * 256 - min) + min).toString(16)
    const color = () => {
        const clr = rand()
        return clr.length < 2 ? '0' + clr : clr
    }
    return `#${color()}${color()}${color()}`
}
