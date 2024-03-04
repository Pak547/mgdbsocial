
function dateFormat(date) {
    // You can modify this function to format the date as needed.
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
}

module.exports = dateFormat;
