const products = [
    {
        countInStock: 4,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/651/532/detailed/15/Dell_Inspiron-5570-Intel_Core_I7-%D8%AF%D9%8A%D9%84-EGYPTLAPTOP-1.jpg',
        brand: 'Dell',
        model: 'Inspiron 5570',
        price: 12649,
        specs: {
            processor: 'Intel® Core™i7',
            ram: '8GB DDR4',
            storage: {
                hdd: '1TB',
                ssd: '120GB'
            },
            vga: 'AMD Radeon® 530 Graphics',
            resolution: 'FHD 1920x1080'
        }
    },
    {
        countInStock: 3,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1060/868/detailed/8/lenovo-ideapad-520-15-gallery-1_hozd-x0.jpg',
        brand: 'Lenovo',
        model: 'Ideapad 520',
        price: 12900,
        specs: {
            processor: 'Intel® Core™i7',
            ram: '8GB DDR4',
            storage: {
                hdd: '1TB',
                ssd: '120GB'
            },
            vga: 'NVIDIA® GeForce® GT940MX',
            resolution: 'FHD 1920x1080'
        }
    },
    {
        countInStock: 2,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1024/838/detailed/17/HP_450_G6-Intel_Core_i5-EGYPTLAPTOP-1.jpg',
        brand: 'HP',
        model: 'Probook 450',
        price: 11499,
        specs: {
            processor: 'Intel® Core™i5',
            ram: '8GB DDR4',
            storage: {
                hdd: '1TB',
                ssd: null
            },
            vga: 'NVIDIA® GeForce® MX130',
            resolution: 'HD 1366x768'
        }
    },
    {
        countInStock: 8,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1000/819/detailed/19/Acer_Aspire-A315-Intel_Core_i3-EGYPTLAPTOP-1_15f3-vg.jpg',
        brand: 'Acer',
        model: 'Aspire A315',
        price: 5249,
        specs: {
            processor: 'Intel® Core™i3',
            ram: '8GB DDR4',
            storage: {
                hdd: '1TB',
                ssd: null
            },
            vga: 'Intel HD Graphics 620',
            resolution: 'HD 1366x768'
        }
    },
    {
        countInStock: 1,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1024/838/detailed/18/MSI-GS65_Stealth-Intel_Core_i7-EGYPTLAPTOP-13.jpg',
        brand: 'MSI',
        model: 'GS65 Stealth',
        price: 5249,
        specs: {
            processor: 'Intel® Core™i7',
            ram: '16GB DDR4',
            storage: {
                hdd: '2TB',
                ssd: '250GB'
            },
            vga: 'NVIDIA® GeForce® RTX 2070',
            resolution: 'FHD 1920x1080'
        }
    },
    {
        countInStock: 9,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1000/819/detailed/18/Dell_Inspiron-3565-AMD_A9-EGYPTLAPTOP-1.jpg',
        brand: 'Dell',
        model: 'Inspiron 3565',
        price: 4849,
        specs: {
            processor: 'AMD A9-9425',
            ram: '4GB DDR4',
            storage: {
                hdd: '500GB',
                ssd: null
            },
            vga: 'AMD Integrated Graphics',
            resolution: 'HD 1366x768'
        }
    },
    {
        countInStock: 0,
        image: 'https://egyptlaptop.com/images/watermarked/1/thumbnails/1024/838/detailed/15/3552-EGYPTLAPTOP-1.jpg',
        brand: 'Dell',
        model: 'Inspiron 3552',
        price: 5299,
        specs: {
            processor: 'Intel® Celeron® Processor',
            ram: '4GB DDR4',
            storage: {
                hdd: '500GB',
                ssd: null
            },
            vga: 'Integrated Intel® HD Graphics',
            resolution: 'HD 1366x768'
        }
    }
]

export default products