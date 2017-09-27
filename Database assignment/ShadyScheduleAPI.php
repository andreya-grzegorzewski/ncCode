<?php

require("dbCreds.php");

echo $_POST['method']();

function sanitize($str, $quotes = ENT_NOQUOTES)
{
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getDatabases()
{
    // retrieve and sanitize posted values.
    if (isset($_POST['server']))
        $server = json_decode(sanitize($_POST['server']));

    if (isset($_POST['username']))
        $username = json_decode(sanitize($_POST['username']));

    if (isset($_POST['password']))
        $password = json_decode(sanitize($_POST['password']));

    $databaseNames = array();

    $dbConn = mysqli_connect($server, $username, $password);
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);

    if($result)
    {
        while($row = $result->fetch_array())
            array_push($databaseNames, $row[0]);
    }

    $return = new stdClass;
    $return->credentials = $server + " " + $username + " " + $password;
    $return->success = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    return $json;
}

function insertClass()
{
    if (isset($_POST['ClassName']))
        $ClassName = json_decode(sanitize($_POST['ClassName']));

    if (isset($_POST['ProfName']))
        $ProfName = json_decode(sanitize($_POST['ProfName']));

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error)
        die("Connection failed: " . $dbConn->connect_error);

    $query = "INSERT INTO Classes ( ClassName, ProfName ) " .
        "VALUES ( '" .
        $ClassName . "', '" .
        $ProfName . "' );";

    $result = $dbConn->query($query);
    $return = new stdClass;
    
    $return->querystring = $query;

    if($result)
        $return->success = true;
    else
        $return->success = false;

    return json_encode($return);
}

function updateClasses()
{
    if (isset($_POST['ClassID']))
        $ClassID = json_decode(sanitize($_POST['ID']));

    if (isset($_POST['newClassName']))
        $newClassName = json_decode(sanitize($_POST['newClassName']));

    if (isset($_POST['newProfName']))
        $newProfName = json_decode(sanitize($_POST['newProfName']));

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error)
        die("Connection failed in updateClasses()");

    $query = "UPDATE Classes " .
        "SET ClassName='" . $newClassName .
        "' SET ProfName='" . $newProfName .
        "' WHERE ClassID=" . $ClassID;

    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = $query;

    if ($result)
        $return->success = true;
    else
        $return->success = false;

    return json_encode($return);
}

function getClasses()
{
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "SELECT * FROM Classes";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error)
    {
        $return = new StdClass(); // Added
        $return->connect_error = "Connection failed: " . $dbConn -> connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $classes = array();

    if ($result)
    {
        while ($row = $result->fetch_array())
        {
            $allColumns = array();
            for ($i = 0; $i < 3; $i++)
                array_push($allColumns, $row[$i]);

            array_push($classes, $allColumns);
        }
    }

    $return = new StdClass();
    $return->success = true;
    $return->classes = $classes;
    $return->querystring = $query;
    $return->credentials =
        demoUsername() . " " .
        demoPassword() . " " .
        demoDB () . " on ".
        demoServer();
    return json_encode($return);
}

function getDaysOfWeek()
{
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "SELECT * FROM DaysOfWeek";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error)
    {
        $return = new stdClass();
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    
    $daysOfWeek = array();
    
    if($result)
    {
        while($row = $result->fetch_array())
        {
            $allColumns = array();
            for ($i = 0; $i < 3; $i++)
                array_push($allColumns, $row[$i]);
            array_push($daysOfWeek, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->daysOfWeek = $daysOfWeek;
    $return->querystring = $query;
    return json_encode($return);
}

function insertMeetingTime()
{
    if (isset($_POST['ClassID']))
        $ClassID = json_decode(sanitize($_POST['ClassID']));

    if (isset($_POST['DayOfWeek']))
        $DayOfWeek = json_decode(sanitize($_POST['DayOfWeek']));

    if (isset($_POST['StartTime']))
        $StartTime = json_decode(sanitize($_POST['StartTime']));

    if (isset($_POST['EndTime']))
        $EndTime = json_decode(sanitize($_POST['EndTime']));

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    if ($dbConn->connect_error)
        die("Connection failed: " . $dbConn->connect_eror);

    $query = "INSERT INTO MeetingTimes ( ClassID, DayOfWeek, StartTime, EndTime ) VALUES ( '" .
        $ClassID . "', '" .
        $DayOfWeek . "', '" .
        $StartTime . "', '" .
        $EndTime . "' );";

    $result = $dbConn->query($query);
    $return = new stdClass();
    $return->querystring = $query;
    if ($result)
        $return->success = true;
    else
        $return->success = false;

    return json_encode($return);
}

function getMeetingTimes()
{
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "SELECT * FROM MeetingTimes";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error)
    {
        $return = new stdClass();
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $meetingTimes = array();

    if ($result)
    {
        while ($row = $result->fetch_array())
        {
            $allColumns = array();
            for ($i = 0; $i < 4; $i++)
                array_push($allColumns, $row[$i]);
            array_push($meetingTimes, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->meetingTimes = $meetingTimes;
    $return->querystring = $query;
    return json_encode($return);
}