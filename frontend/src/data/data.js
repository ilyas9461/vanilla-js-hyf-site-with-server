export const dataConst = [
    {
        id: 1,
        title: "Nano 33 IoT",
        category: "nano",
        img: "https://www.arduino.cc/wiki/static/8ec0d0616effd3d37ddd111d93310a6b/a2510/nano-33-iot.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `ATmega328`
    },
    {
        id: 2,
        title: "Nano",
        category: "nano",
        img: "https://www.arduino.cc/wiki/static/3dbf51a969cfdb2e998fff260563f1db/a2510/nano.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `ATmega328`,
    },
    {
        id: 3,
        title: "Nano ESP32",
        category: "nano",
        img: "https://www.arduino.cc/wiki/static/1c4f828c21b084630f9ccebc0b879e4b/a2510/nano-esp32.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `u-blox® NORA-W106 (ESP32-S3)`,
    },
    {
        id: 4,
        title: "MKR1000 WIFI",
        category: "mkr",
        img: "https://www.arduino.cc/wiki/static/b92e82929f10b85ae50614e733897b31/67e9d/mkr_1000_wifi.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `SAMD21 Cortex®-M0+ 32bi`,
    },
    {
        id: 5,
        title: "Mega 2560 Rev3",
        category: "mega",
        img: "https://www.arduino.cc/wiki/static/c1e055dbac35723e2ea11b54857c2a9e/a2510/mega.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `ATmega2560`,
    },
    {
        id: 6,
        title: "MKR GPS Shield",
        category: "shields",
        img: "https://www.arduino.cc/wiki/static/9adfbf603213eba08429a907bdae9bb8/a2510/mkr_gps_shield.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `u-blox module SAM-M8Q`,
    },
    {
        id: 7,
        title: "MKR Mem Shield",
        category: "shields",
        img: "https://www.arduino.cc/wiki/static/b98ae6ec8f2d11b38bb613a4f01255a0/41099/mkr_mem_shield.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `Micro SD Card`,
    },
    {
        id: 8,
        title: "Uno Rev3",
        category: "uno",
        img: "https://www.arduino.cc/wiki/static/47b1410b6a28539f9175c4258f053bfc/a2510/uno.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `ATmega328P`,
    },
    {
        id: 9,
        title: "Starter Kit Multi-language",
        category: "kits",
        img: "https://www.arduino.cc/wiki/static/babf36463632d2746aaf748c193afd87/a2510/starter-kit.jpg",
        pins: `https://content.arduino.cc/assets/Pinout-NANO33IoT_latest.png`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `Arduino UNO`,
    },
    {
        id: 10,
        title: "Opla IoT Kit",
        category: "kits",
        img: "https://www.arduino.cc/wiki/static/a6a763f53b3fa1d69238a3d81b7857b1/a2510/opla-iot-kit.jpg",
        pins: `https://store.arduino.cc/cdn/shop/products/AKX00026_07.carrier_1000x750.jpg?v=1642772164`,
        microprocessor: `SAMD21 Cortex®-M0+ 32bit`,
        desc: `Arduino MKR WiFi 1010`,
    }
];

/**
 * For local data object keys.
 */
export const localFields=Object.freeze({
    users:'users',
    dbData:'dbData',
})

/**
 * Get local data with key-value. If data exist then save data local with key=field.
 * @async
 * @method
 * @param {Array object} data - data
 * @param {String} field - key
 * @returns {data} array object
 */
export const getDbDataLocal = (data, field) => {
    const localData = localStorage.getItem(field) || false

    if (!localData && data) {
        localStorage.setItem(field, JSON.stringify(data))
    } else {
        return JSON.parse(localData)
    }
}


