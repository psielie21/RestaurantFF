export default (dateString) => {
    const date = new Date(dateString);
    const delta = Math.round((+new Date - date) / 1000);

    const minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    const optionsWithoutYear = { month: 'short', day: 'numeric' };
    const optionsWithYear = { year: "numeric", month: "numeric", day: "numeric" };
    
    let returnString;

    if (delta < 30) {
        returnString = 'just then.';
    } else if (delta < minute) {
        returnString = delta + ' seconds ago.';
    } else if (delta < 2 * minute) {
        returnString = 'a minute ago.'
    } else if (delta < hour) {
        returnString = Math.floor(delta / minute) + ' minutes ago.';
    } else if (Math.floor(delta / hour) == 1) {
        returnString = '1 hour ago.'
    } else if (delta < day) {
        returnString = Math.floor(delta / hour) + ' hours ago.';
    } else if (delta < day * 2) {
        returnString = 'yesterday';
    } else if (delta < day * 3) {
        returnString = "2 days ago";
    }else if(date.getFullYear() == (new Date()).getFullYear()){
        returnString = date.toLocaleDateString('de-DE', optionsWithoutYear);
    }else {
        returnString = date.toLocaleDateString('de-DE', optionsWithYear);
    }
    return returnString;
}