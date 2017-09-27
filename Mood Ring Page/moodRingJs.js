function hideMoods()
{
    $(document).ready(function () {
        $("p.happy").hide();
        $("p.mad").hide();
        $("p.sad").hide();
        $("p.inLove").hide();
    })
}

var hasSwitched = false;

function checkForBoredom()
{
    if (!hasSwitched)
        switchToHappy()
}

function switchToHappy()
{
    $("body").removeClass();
    $("body").addClass("happy");
    $("p").hide();

    $("p.happy").show();

    $("audio").trigger('pause');
    $("audio.happy").trigger('play');

    hasSwitched = true;
}

// If the user hasn't moved in 33 seconds, the Jeopardy theme is done.
// The page automatically switches to the happy mood.
setTimeout(checkForBoredom, 33000);

function switchToSad()
{
    $("body").removeClass();
    $("body").addClass("sad");
    $("p").hide();

    $("p.sad").show();

    $("audio").trigger('pause');
    $("audio.sad").trigger('play');

    hasSwitched = true;
}

function switchToMad()
{
    $("body").removeClass();
    $("body").addClass("mad");
    $("p").hide();

    $("p.mad").show();

    $("audio").trigger('pause');
    $("audio.mad").trigger('play');

    hasSwitched = true;
}
function switchToInLove()
{
    $("body").removeClass();
    $("body").addClass("inLove");
    $("p").hide();

    $("p.inLove").show();

    $("audio").trigger('pause');
    $("audio.inLove").trigger('play');

    hasSwitched = true;
}

function tryBoring()
{
    alert("You can't be bored with all of this cool CSS and jQuery!");
    $("button.bored").hide("slow");
}