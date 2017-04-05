/*
 * FORMATS
 * dd.MM.yyyy
 * dd-MM-yyyy
 * 
 * 
 */

var Convert;
(function (Convert)
{
    Convert.ToDate = function (dateString, format)
    {
        var dtSegments = getDateSegments(dateString.trim(), format);
        var date = new Date();
        date.setYear(dtSegments.year);
        date.setMonth(dtSegments.month);
        date.setDate(dtSegments.day);

        return date;
    }

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
        dt.month = +(splittedDate[splittedFormat.indexOf('MM')] - 1);
        dt.day = +splittedDate[splittedFormat.indexOf('dd')];
        return dt;
    }

})(Convert || (Convert = {}));

console.log(Convert.ToDate('01.08.2016', 'dd.MM.yyyy'));