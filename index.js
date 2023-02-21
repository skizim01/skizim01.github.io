const values = {
    storageValue: 0,
    transferValue: 0
}

const media = window.matchMedia("(max-width: 670px)")
media.onchange = () => generateGistagram()


const plans = [0.06, 0.03];

const storagePrice = [0.02, 0.01];


const typeOfInput = ["storage", "transfer"];
const typeOfCheckbox = ["type", "plan"];

typeOfCheckbox.forEach(name => {
    document.getElementById(name).addEventListener("change", () => {
        generateGistagram();
    })

})

typeOfInput.forEach(name => {
    document.getElementById(name).addEventListener("change", (event) => {
        values[`${name}Value`] = event.target.value;
        document.getElementById(`${name}Value`).innerHTML = `${event.target.value} $`
        generateGistagram();
    })
});


const calcBackblaze = () => {
    const result = values.storageValue * 0.005 + values.transferValue * 0.01;
    if (result <= 7) return 7;
    else return result;
}


const calcBunny = () => {
    const type = document.getElementById("type")
    const result = values.storageValue * storagePrice[+type.checked] + values.transferValue * 0.01;
    if (result <= 10) return result;
    else return 10;
}


const calcScaleway = () => {
    const plan = document.getElementById("plan")
    const storage = values.storageValue <= 75 ? 0 : values.storageValue - 75;
    const transfer = values.transferValue <= 75 ? 0 : values.transferValue - 75;
    return storage * plans[+plan.checked] + transfer * 0.02;
}


const calcVultr = () => {
    const result = values.storageValue * 0.01 + values.transferValue * 0.01;
    if (result <= 5) return 5;
    else return result;
}

const generateGistagram = (t) => {
    const results = {
        backblaze: calcBackblaze(),
        bunny: calcBunny("ssd"),
        scaleway: calcScaleway("multi"),
        vultr: calcVultr()
    }

    let min = 10000
    let max = 0
    Object.values(results).forEach(result => {
        if (result < min) min = result
        if (result > max) max = result
    })

    const color = {
        backblaze: "red",
        bunny: "orange",
        scaleway: "pink",
        vultr: "blue"
    }



    const elements = document.getElementsByClassName('itemValue')
    for (let div of elements) {
        const company = div.getAttribute('company')
        div.style.height = media.matches?`${260 * results[company] / max + 10}px`:"20px"
        div.style.width = !media.matches?`${260 * results[company] / max + 10}px`:"20px"
        document.getElementById(`${company}Result`).innerHTML = results[company].toFixed(2) + "$"
        if (results[company] === min) {
            div.style.backgroundColor = color[company]
        } else div.style.backgroundColor = "gray"

    }
}
generateGistagram()








