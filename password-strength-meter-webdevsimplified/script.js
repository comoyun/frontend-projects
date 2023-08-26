let strMeter = document.querySelector(".strength-meter"),
    pwdImprt = document.querySelector(".password-input"),
    reasons = document.querySelector("#reasons");

const updateStrengthMeter = () => {
    const weaknesses = calcPwdStrength(pwdImprt.value);
    let strength = 100;

    reasons.innerHTML = "";
    weaknesses.forEach(_weakness => {
        if (_weakness === undefined) return;

        strength -= _weakness.deduction;
        const msg = document.createElement("div");
        msg.innerText = _weakness.message;
        reasons.appendChild(msg);
    });

    strMeter.style.setProperty("--strength", strength);
};

const lengthWeakness = _password => {
    const len = _password.length;
    if (len <= 5) return {
        message: "Password is too short.",
        deduction: 40
    }
    if (len <= 10) return {
        message: "Password should be longer",
        deduction: 15
    }
}

const lowercaseWeakness = _password => {
    return characterTypeWeakness(_password, /[a-z]/g, "lowercase characters");
};

const repeatCharsWeakness = _password => {
    const matches = _password.match(/(.)\1/g) || [];

    if (matches.length > 0) return {
        message: "Your password has repeat characters",
        deduction: matches.length * 10
    }
};

const characterTypeWeakness = (_password, _regex, _type) => {
    const matches = _password.match(_regex) || [];
    if (matches.length === 0) return {
        message: `Your password has no ${_type}.`,
        deduction: 20
    }

    if (matches.length <= 2) return {
        message: `Your password could use more ${_type}.`,
        deduction: 5
    }
};

const uppercaseWeakness = _password => {
    return characterTypeWeakness(_password, /[A-Z]/g, "uppercase characters");
};

const numberWeakness = _password => {
    return characterTypeWeakness(_password, /[0-9]/g, "numbers");
};

const specialCharsWeakness = _password => {
    return characterTypeWeakness(_password, /[^0-9a-zA-Z\s]/g, "special characters");
};

const calcPwdStrength = _password => {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(_password))
    weaknesses.push(lowercaseWeakness(_password));
    weaknesses.push(uppercaseWeakness(_password));
    weaknesses.push(numberWeakness(_password));
    weaknesses.push(specialCharsWeakness(_password));
    weaknesses.push(repeatCharsWeakness(_password));
    return weaknesses;
};

updateStrengthMeter();
pwdImprt.addEventListener("input", updateStrengthMeter);
