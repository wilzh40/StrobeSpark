ToneDenReady = window.ToneDenReady || [];
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
