const {exec} = require('child_process');
const path = require('path');

export enum GpioMapping {
    Regular = 'regular',
    AdafruitHat = 'adafruit-hat'
}

export interface MatrixOptions {
    brightness?: number;
    cols?: 16 | 32 | 64;
    hardware?: GpioMapping;
    rows?: 16 | 32 | 64;
    gpioSlowdown?: 0 | 1 | 2 | 3 | 4;
}

export class LedMatrix {

    static PATH = path.join(__dirname, '../rpi-rgb-led-matrix');
    private readonly options: string;

    constructor({cols = 64, gpioSlowdown = 2, rows = 32, brightness = 100, hardware = GpioMapping.AdafruitHat}: MatrixOptions = {}) {
        this.options = `--led-gpio-mapping=${hardware} --led-cols=${cols} --led-slowdown-gpio=${gpioSlowdown} --led-brightness=${brightness}`;
    }

    clock() {
        const command = `sudo ${LedMatrix.PATH}/examples-api-use/clock -f ${LedMatrix.PATH}/fonts/8x13.bdf -d "%I:%M %p" -y 8  ${this.options}`;
        const child = exec(command);
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    }
}
