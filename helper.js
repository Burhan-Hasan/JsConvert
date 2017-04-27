var DateHelper;

(function (DateHelper) {

    DateHelper.GetWeekNumber = function () {
        var year = date.getFullYear(),
            day = date.getDay();

        var tmp = (new Date(year, 0, 1)).getDay(),
            dayOfWeekForJan1 = tmp == 0 ? 7 : tmp;

        var dayou = dayOfYear(date);
        var result = Math.floor((dayou - 1 + dayOfWeekForJan1) / 7 + 0.9);
        return result;
    }

    function dayOfYear(d) {
        var start = new Date(d.getFullYear(), 0, 0);
        var diff = d - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }


}(DateHelper || (DateHelper = {})));