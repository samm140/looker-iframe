function rrSendScroll() {
    var iframes = document.getElementsByClassName("rr-embed");
    var de = document.documentElement;
    for (var i = 0; i < iframes.length; i += 1) {
        var box = iframes[i].getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var message = JSON.stringify({
            channel: "rr",
            id: parseInt(iframes[i].getAttribute("data-rr-id"), 10),
            scrollY: window.scrollY,
            offsetTop: top
        });
        iframes[i].contentWindow.postMessage(message, "*");
    }
}

window.addEventListener("message", function (e) {
    try {
        var d = JSON.parse(e.data);
        var c = d.channel;
        if (c === "rr") {
            document.getElementById("dashboard-" + d.id).style.height = d.height + "px";
            rrSendScroll();
        }
    } catch (error) {
        console.error("Message event error:", error);
    }
});

window.addEventListener("scroll", rrSendScroll);
