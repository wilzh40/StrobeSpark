/*ToneDenReady = window.ToneDenReady || [];
ToneDenReady.push(function() {
    // This is where all the action happens:
    ToneDen.player.create({
        shrink: false,
        single: true,
        dom: "#player",
        eq: "waves",
        skin: "light",
        tracksPerArtist: 4,
        urls: [
            "https://soundcloud.com/lil_jon/turn-down-for-what-dj-snake"
        ]
    });
});
*/

$.ajax({
    type: 'POST',
    url: 'https://api.spark.io/v1/devices/54ff72066667515141081567/getBPM?access_token=71177b5e2ea528b6f84f2729f0017aba9071b5e0',
    crossDomain: true,
    data: {"arg":"55"},
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        var value = responseData.someKey;
        console.log(value);
    },
    error: function (responseData, textStatus, errorThrown) {
        alert('POST failed.');
    }
});