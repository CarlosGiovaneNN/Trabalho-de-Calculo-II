const min = 1, max = 8;

const getValues = (n) => {
    const interval = max - min;
    const variation = interval / n;

    const arr = [];

    for(let i = 0; i < n; i++){
        const currentValue = i > 0 ? arr[i-1][1] : min;
        const lastValue = i === n-1 ? max :  currentValue + variation
        arr.push([currentValue, lastValue]);
    }
    
    const y = []
    const rectangles = []
    
    arr.forEach(item => {
        const avg = (item[0] + item[1])/2;
        const height = Math.log10(avg**3);
        
        rectangles.push((item[1] - item[0])*height)
        y.push(height)
    })

    const totalArea = rectangles.reduce((acc, i) => acc + i, 0);

    return {
        intervals: arr,
        y,
        rectangles,
        totalArea
    }
}