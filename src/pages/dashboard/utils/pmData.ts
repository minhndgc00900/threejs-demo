export const generatePM25Data = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        data.push({
            date: new Date(d),
            value: Math.floor(Math.random() * 100),
        });
    }

    return data;
};
