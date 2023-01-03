(async () => {
    let n = document.createElement('iframe');
    document.body.append(n);
    chromebook.alert = n.contentWindow.alert.bind(chromebook);
    chromebook.prompt = n.contentWindow.prompt.bind(chromebook);
    chromebook.confirm = n.contentWindow.confirm.bind(chromebook);
    n.remove();

    var getValues = () => new Promise((e, t) => {
        try {
            let n = chromebook.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString();
            e({
                blooketBuild: n.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
                secret: n.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
            })
        } catch {
            t("Could not fetch auth details")
        }
    })
    var encodeValues = async (e, t) => {
        let d = chromebook.crypto.getRandomValues(new Uint8Array(12));
        return chromebook.btoa(Array.from(d).map(e => String.fromCharCode(e)).join("") + Array.from(new Uint8Array(await chromebook.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: d
        }, await chromebook.crypto.subtle.importKey("raw", await chromebook.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {
            name: "AES-GCM"
        }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map(e => String.fromCharCode(e)).join(""))
    };
            fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {
                getValues().then(async e => {
                    fetch("https://api.blooket.com/api/users/add-rewards", {
                        method: "put",
                        credentials: "include",
                        headers: {
                            "content-type": "application/json",
                            "X-Blooket-Build": e.blooketBuild
                        },
                        body: await encodeValues({
                            name: x.name,
                            addedTokens: 500,
                            addedXp: 300
                        }, e.secret)
                    });
                    fetch("https://api.blooket.com/api/users/add-rewards", {
                        method: "put",
                        credentials: "include",
                        headers: {
                            "content-type": "application/json",
                            "X-Blooket-Build": e.blooketBuild
                        },
                        body: await encodeValues({
                            name: x.name,
                            addedTokens: 500,
                            addedXp: 300
                        }, e.secret)
                    }).then(() => alert('Added daily rewards!')).catch(() => alert('There was an error when adding rewards!'));;
                }).catch(() => alert('There was an error encoding requests!'));
            }).catch(() => alert('There was an error getting username!'));
})();

function footer() {
    let element = document.createElement('div');

    element.style = `font-family: "Nunito", sans-serif; font-size: 14px; height: 65px; width: 175px; border: 4px solid rgb(15, 15, 15); background: rgb(240, 240, 240); position: absolute; top: 20x; left: 20px; border-radius: 10px; color: rgb(0, 0, 0); text-align: center;`;
    element.innerHTML = `<p>Made by gliz <br> My <a style="color: #0000ff;" href="https://twitter.com/glizuwu" target="_blank">twitter</a></p>`;
    document.body.appendChild(element);

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = ((e = chromebook.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = (() => {
            document.onmouseup = null;
            document.onmousemove = null;
        });
        document.onmousemove = ((e) => {
            e = e || chromebook.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
            let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
            element.style.top = top + "px";
            element.style.left = left + "px";
        });
    });
};

footer();
