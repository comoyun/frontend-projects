const textEl = document.querySelector(".text"),
    input = document.querySelector("#code"),
    flags = document.querySelector("#flags"),
    logEl = document.querySelector(".log"),
    replace = document.getElementById("replace"),
    replaceTxt = document.getElementById("replace_txt");

let text = textEl.textContent.trim(),
    result = "",
    code, groups,
    ignore = ["arrowright", "arrowup",
        "arrowdown", "shift",
        "arrowleft", "ctrl", "alt"];

const getOrdinal = _number => {
    let ordinal = "th";
    if (_number % 10 === 1 || _number % 100 === 11) ordinal = "st";
    else if (_number % 10 === 2 || _number % 100 === 12) ordinal = "nd";
    else if (_number % 10 === 3 || _number % 100 === 13) ordinal = "rd";

    return ordinal;
};

const update = () => {

    text = textEl.textContent.trim();
    result = "",
        groupNo = 0;

    if (input.value.length === 0) {
        logEl.innerHTML = "RegExp is empty.";
        return;
    }

    logEl.innerHTML = "<span class='success'>Code executed successfully<br/>===</span>";

    try {
        code = new RegExp(input.value, flags.value);
        groups = code.exec(text),
            matches = 0;

        if (!groups) throw new Error("Couldn't find any match.");

        result = text.replace(code, function (_) {
            let el = "<span class='match' contenteditable='false'>" + _ + "</span>",
                index = arguments[arguments.length - 2];

            ++matches;

            return el;
        });

        logEl.innerHTML += "<br/>Groups: " + (groups.length - 1) +
            "<br/>Matches: " + matches;

        textEl.innerHTML = result;
    } catch (_error) {
        logEl.innerHTML = "<span class='error'>" + _error.message + "</span>";
    }
};

window.addEventListener("dblclick", _ => {
    update();
    _.preventDefault();
});

input.addEventListener("keydown", (_) => {
    setTimeout(() => {
        if (!ignore.includes(_.key.toLowerCase())) update();
    }, 1);
});

flags.addEventListener("keydown", () => setTimeout(update, 1));

replace.addEventListener("change", () => replaceTxt.disabled = !replace.checked);

replaceTxt.addEventListener("keydown", (_) => {
    if (_.key !== "Enter") return;
    update();
    result = text.replace(code, replaceTxt.value);
    textEl.innerHTML = result;
});