

export const formatDate = (date, fmt = 'YYYY-MM-DD') => {
    if (!date) return ''
    const d = new Date(date)
    // Simple placeholder implementation
    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    
    return `${year}-${month}-${day}`
}

export const getDayDiff = (d1, d2) => {
    const diffTime = Math.abs(new Date(d2) - new Date(d1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}
