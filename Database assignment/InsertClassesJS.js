var $classes;
var $meetingTimes;
var $daysOfWeek;

function insertMeetingTime()
{
    var ClassID, DayOfWeek, StartTime, EndTime;
    ClassID = JSON.stringify($('#classNameSelect option:selected').val());
    DayOfWeek = JSON.stringify($('#dayOfWeekSelect option:selected').val());
    StartTime = JSON.stringify($('#startTime').val());
    EndTime = JSON.stringify($('#endTime').val());
    ajax = insertMeetingTimeAjax("insertMeetingTime", ClassID, DayOfWeek, StartTime, EndTime);
    ajax.done(insertMeetingTimeCallback);
    ajax.fail(function() {
        alert(response['querystring']);
        alert("Failure in insertMeetingTime");
    });
    getClasses();
}

function insertMeetingTimeAjax(method, ClassID, DayOfWeek, StartTime, EndTime)
{
    return $.ajax({
        url: 'ShadyScheduleAPI.php',
        type: 'POST',
        data: {method: method,
        ClassID: ClassID,
        DayOfWeek: DayOfWeek,
        StartTime: StartTime,
        EndTime: EndTime}
    });
}

function insertMeetingTimeCallback(response_in)
{
    response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        alert("Insert failed on query:" + '\n' +
            response['querystring'] +
            '\nThat class might already have a meeting time on that day.');
    }
    else
    {
        getClasses();
        getMeetingTimes();
    }
}

function insertClass()
{
    var ClassName, ProfName;
    ClassName = JSON.stringify($('#className').val());
    ProfName = JSON.stringify($('#profName').val());
    var ajax = insertClassAjax("insertClass", ClassName, ProfName);
    ajax.done(insertClassCallback);
    ajax.fail(function() {
        alert("Failure in insertClass");
    });
}

function insertClassAjax(method, ClassName, ProfName)
{
    return $.ajax({
        url: 'ShadyScheduleAPI.php',
        type: 'POST',
        data: {method: method,
        ClassName: ClassName,
        ProfName: ProfName}
    });
}

function insertClassCallback(response_in) {
    $classes = response_in;
    response = JSON.parse(response_in);
    
    if (!response['success'])
    {
        $("#results").html("");
        alert("Insert failed.");
    }
    else
        getClasses();
}

function onLoad()
{
    getClasses();
    getDaysOfWeek();
    getMeetingTimes();
}

function getClasses()
{
    ajax = getClassesAjax("getClasses");
    ajax.done(getClassesCallback);
    ajax.fail(function () {
        alert("Failure in getClasses call to getClassesAjax");
    });
}

function getClassesAjax(method)
{
    return $.ajax({
        url: 'ShadyScheduleAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getClassesCallback(response_in)
{
    response = JSON.parse(response_in);
    $classes = response["classes"];
    if (!response['success'])
        alert("getClasses failed.");
    else
    {
        $('#classNameSelect').find('option').remove();
        showClasses($classes);
        $.each($classes,
            function(key, row)
            {
                $("#classNameSelect").append($('<option>',
                    {
                        value: row[0].toString(),
                        text: row[1].toString()
                    }));
            })
    }
}

function showClasses(classes)
{
    var classList = "";

    $.each(classes, function (key, value)
    {
        var itemString = "";
        $.each(value, function (key, item)
        {
            itemString += item + "&nbsp &nbsp &nbsp";
        });
        classList += itemString + '<br>';
    });

    $("#results").html(classList);
}

function showMeetingTimes(meetingTimes)
{
    var meetingTimesList = "";

    $.each(meetingTimes, function (key, value)
    {
        var itemString = "";
        $.each(value, function (key, item)
        {
            itemString += item + "&nbsp &nbsp &nbsp";
        });
        meetingTimesList += itemString + '<br>';
    });
    $("#meetingTimeResults").html(meetingTimesList);
}

function getDaysOfWeek()
{
    ajax = getDaysOfWeekAjax("getDaysOfWeek");
    ajax.done(getDaysOfWeekCallback);
    ajax.fail(function() {
        alert("Failure in getDaysOfWeek");
    });
}

function getDaysOfWeekAjax(method)
{
    return $.ajax({
        url: 'ShadyScheduleAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getDaysOfWeekCallback(response_in)
{
    response = JSON.parse(response_in);
    $daysOfWeek = response["daysOfWeek"];
    if (!response['success'])
        alert("getDaysOfWeek failed");
    else
    {
        $('#dayOfWeekSelect').find('option').remove();
        $.each($daysOfWeek, function (key, dayOfWeek)
        {
            $("#dayOfWeekSelect").append($('<option>',
                {
                    value: dayOfWeek[0].toString(),
                    text: dayOfWeek[1].toString()
                }));
        });
    }
}

function getMeetingTimes()
{
    ajax = getMeetingTimesAjax("getMeetingTimes");
    ajax.done(getMeetingTimesCallback);
    ajax.fail(function() {
        alert("Failure in getMeetingTimes");
    });
}

function getMeetingTimesAjax(method)
{
    return $.ajax({
        url: 'ShadyScheduleAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getMeetingTimesCallback(response_in)
{
    response = JSON.parse(response_in);
    $meetingTimes = response["meetingTimes"];
    if (!response['success'])
        alert("getMeetingTimes failed");
    else
        showMeetingTimes($meetingTimes);
}