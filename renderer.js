
const information = document.getElementById('info');
information.innerText = `Using chrome version ${versions.chrome}, node version ${versions.node()}, electron version ${versions.electron()}`

const button = document.getElementById('submit');
button.addEventListener("click", async() => {
    const input = document.getElementById('limitNumber').value
    const results = await versions.fizzBuzz(+input)
    
    // logs to browser window
    //console.log(results)
    const output = document.getElementById('output')
    output.innerHTML = ""
    for (const element of results) {
        const elementSpan = document.createElement('span')
        elementSpan.innerText = element
        output.appendChild(elementSpan)
    }
});