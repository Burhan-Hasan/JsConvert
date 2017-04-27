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

    DateHelper.StartDateOfWeek = function () {
        var _1_jan = new Date(year, 0, 1);

        // no calculation needed
        if (week == 1)
            return _1_jan;

        var _1_jan_day_of_week = (_1_jan.getUTCDate() + 5) % 7 + 1;
        var tmpDate = new Date(((week - 1) * 7 + 1 - _1_jan_day_of_week) * 86400000 + _1_jan.getTime());

        var year = tmpDate.getFullYear(),
            month = tmpDate.getMonth(),
            day = tmpDate.getDate(),
            dayOfWeek = tmpDate.getDay();

        if (dayOfWeek != 1)
            return new Date(year, month, day - dayOfWeek + 1);
        return tmpDate;
    }

    DateHelper.EndDateOfWeek = function () {
        var tmpDate = startDateOfWeek(week, year)

        var year = tmpDate.getFullYear(),
            month = tmpDate.getMonth(),
            day = tmpDate.getDate(),
            dayOfWeek = tmpDate.getDay();

        if (dayOfWeek != 0) {
            tmpDate = new Date(year, month, day + 7 - dayOfWeek);
            if (tmpDate.getFullYear() != year)
                tmpDate = new Date(year, 11, 31);
        }

        return tmpDate;
    }

    function dayOfYear(d) {
        var start = new Date(d.getFullYear(), 0, 0);
        var diff = d - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }


}(DateHelper || (DateHelper = {})));