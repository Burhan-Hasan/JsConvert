/*
 * FORMATS
 * dd.MM.yyyy
 * dd-MM-yyyy
 */

var Convert;
(function (Convert)
{
    //***PUBLIC
    Convert.ToDate = function (dateString, format)
    {
        var dtSegments = getDateSegments(dateString.trim(), format);
        var date = new Date();
        date.setYear(dtSegments.year);
        date.setMonth(dtSegments.month);
        date.setDate(dtSegments.day);

        return date;
    }
    Convert.DateToString = function (date, format)
    {
        if (!validateDate(date))
        {
            console.error('Invalid Date');
            return;
        }

        var seperators = getSeperators(format);
        if (seperators.length > 1)
        {
            console.error('More than one separator was found.');
            return;
        }

        var year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);

        return getStringFromDateSegments({
            year: year,
            month: month,
            day: day
        }, format)
    }

    //***PRIVATE
    function getDateSegments(dateString, format)
    {
        var splittedFormat = null,
            splittedDate = null;

        var separate = null;
        if (~dateString.indexOf('-'))
            separate = '-'
        else if (~dateString.indexOf('.'))
            separate = '.'

        splittedDate = dateString.split(separate);
        splittedFormat = format.split(separate);
        var dt = {};
        dt.year = +splittedDate[splittedFormat.indexOf('yyyy')];
        if (isNaN(dt.year))
            dt.year = convertShortYearToFull(+splittedDate[splittedFormat.indexOf('yy')]);
        dt.month = +(splittedDate[splittedFormat.indexOf('MM')] - 1);
        dt.day = +splittedDate[splittedFormat.indexOf('dd')];
        return dt;
    }

    function getStringFromDateSegments(dateSegments, format)
    {
        return format.replace(/dd/, dateSegments.day).replace(/MM/, dateSegments.month).replace(/yyyy/, dateSegments.year);
    }

    function validateDate(date)
    {
        if (
            Object.prototype.toString.call(date) === '[object Date]' &&
            date.toString !== 'Invalid Date'
           )
            return true;
        return false;
    }

    function getSeperators(format)
    {
        var allSeperators = {};
        for (var i = 0; i < format.length; i++)
        {
            var charCode = format[i].charCodeAt(0);
            if (charCode < 65 || charCode > 122)
                allSeperators[charCode] = format[i];
        }
        return Object.values(allSeperators);
    }

    function convertShortYearToFull(year)
    {
        if (year.toString().length > 2) return;
        year = +year;

        var prefix = "";
        if (year > 88 && year <= 99)
            prefix = "19";
        else
            prefix = "20";

        return +(prefix + ('0'+year).slice(-2));
    }

})(Convert || (Convert = {}));