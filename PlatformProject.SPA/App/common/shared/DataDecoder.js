/**
 * User: nalinK
*/



function getFormattedTime( date )
{

    var year = "" + date.getFullYear();
    var month = "" + (date.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    var day = "" + date.getDate(); if (day.length == 1) { day = "0" + day; }
    var hour = "" + date.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + date.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + date.getSeconds(); if (second.length == 1) { second = "0" + second; }

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

var formatDateTime = function ( date )
{

    var month, day, time, formattedDate = "";

    if ( date )
    {
        month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
        time = date.toTimeString().split(' ')[0];
        formattedDate = day.toString() + "/" + month.toString() + "/" + date.getFullYear().toString() + " " + time;
    }

    return formattedDate;
};

var formatDate = function ( date )
{

    var month, day, formattedDate = "";

    if ( date )
    {
        month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
        formattedDate = day.toString() + "/" + month.toString() + "/" + date.getFullYear().toString();
    }

    return formattedDate;
};

function formatDateForDisplay( date, type )
{

    var formattedDateTime = Const.naVal;
    //        var formattedDate = date.substring(6, 8) + '-' + date.substring(4,6) + '-' + date.substring(0, 4);
    //        var formattedDate = date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4);

    if ( date )
    {
        var formattedDate = date.substring(6, 8) + '-' + date.substring(4, 6) + '-' + date.substring(0, 4);
        var formattedTime = date.substring(8, 10) + ':' + date.substring(10, 12);
        var shortDate = date.substring(6, 8) + '-' + date.substring(4, 6);
        var javaScriptDate = new Date();
        var today = ($("#today").val() != undefined ? $("#today").val() : (javaScriptDate.getFullYear().toString(10) + formatMonthOrDate((javaScriptDate.getMonth() + 1).toString(10)) + formatMonthOrDate(javaScriptDate.getDate().toString(10))));

        if ( type === "d" )
        {
            formattedDateTime = formattedDate;
        }
        else if ( type === "t" )
        {
            formattedDateTime = formattedTime;
        }
        else if ( type === "dt" )
        {
            formattedDateTime = formattedDate + ' ' + formattedTime;
        }
        else if ( type == "dts" )
        {
            var seconds = date.substring(12, 14);
            formattedDateTime = formattedDate + ' ' + formattedTime + ':' + seconds;
        }
        else if ( type == "sdt" )
        {   //Short Date with time  ex: '01-Jan 05:30'
            formattedDateTime = shortDate + ' ' + formattedTime;
        }
        else if ( type == "sd" )
        {   //Short Date with time  ex: '01-Jan'
            formattedDateTime = shortDate;
        }
        else if ( type == "noadt" )
        { // news or announcement date   ex: '01-Jan 05:30' or only time
            var dateString = date.substring(0, 4) + date.substring(4, 6) + date.substring(6, 8);

            if ( today == dateString )
            {
                formattedDateTime = formattedTime;
            }
            else
            {
                formattedDateTime = shortDate + ' ' + formattedTime;
            }
        }
        else if ( type == "imdbndt" )
        {// format imdb news date format '2014-08-13 03:18:00.003' to  '14-Aug 03:18'
            var dateString = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
            formattedTime = date.substring(11, 16);
            shortDate = date.substring(8, 10) + '-' + date.substring(5, 7);

            if ( today == dateString )
            {
                formattedDateTime = formattedTime;
            }
            else
            {
                formattedDateTime = shortDate + ' ' + formattedTime;
            }
        }
        else if ( type == "imdbd" )
        {// format imdb date format '2014-08-13' to  '13-Aug-2013'
            formattedDateTime = date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
        }
        else if ( type == "imdbds" )
        {// format imdb date format '2014-08-13' to  '13-Aug-13'
            formattedDateTime = date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(2, 4);
        }
        else if ( type == "annDetailsDate" )
        {//return yyyy-MM-dd hh:mm:ss.ms
            formattedDateTime = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14) + ".0";
        }
    }

    return formattedDateTime;
}

function formatDateForFiltering( date, type )
{

    var formattedDateTime = '';
    var formattedDate = date.substring(0, 4) + '/' + date.substring(4, 6) + '/' + date.substring(6, 8);
    var formattedTime = date.substring(8, 10) + ':' + date.substring(10, 12);
    var formattedDateNum = date.substring(0, 4) + '/' + date.substring(6, 8) + '/' + date.substring(4, 6);

    if ( type === "d" )
    {
        formattedDateTime = formattedDate;
    }
    else if ( type === "t" )
    {
        formattedDateTime = formattedTime;
    }
    else if ( type === "dn" )
    {
        formattedDateTime = formattedDateNum;
    }
    else if ( type === "dt" )
    {
        formattedDateTime = formattedDate + ' ' + formattedTime;
    }

    return formattedDateTime;
}

function getDatefromString( dateStr )
{

    var date = new Date(dateStr.substr(0, 4), (dateStr.substr(4, 2) - 1), dateStr.substr(6, 2), dateStr.substr(8, 2), dateStr.substr(10, 2), dateStr.substr(12, 2));
    return date;
}

function getDateStringfromString(dateStr)
{

    //  "2014 12 05 13 40 00"
    var time = dateStr.substr(6, 2) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(0, 4);

    return time;
}

function getDateTimeStringfromString(dateStr)
{

    var time = dateStr.substr(6, 2) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(0, 4) + " " + dateStr.substr(8, 2) + ":" + dateStr.substr(10, 2) + ":" + dateStr.substr(12, 2);

    return time;
}




//      "2014-12-05 13:40:00.0"
//    year = parseInt(dateTime.substr(0, 4), 10);
//    month = parseInt(dateTime.substr(5, 2), 10) - 1;
//    day = parseInt(dateTime.substr(8, 2), 10);
//    var date =  new Date(year, month, day);
//
//    time = new Date(year, month, day, hour, minute, second);
