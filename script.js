let dataList = [];

// data_list.json load කිරීම
fetch("data_list.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("data_list.json load වුණේ නැහැ");
        }
        return response.json();
    })
    .then(data => {
        dataList = data;
        console.log("Mapping data loaded:", dataList.length);
    })
    .catch(error => {
        alert("data_list.json load error. File එක project folder එකේ තියෙනවද බලන්න.");
        console.error(error);
    });

function convertText() {
    const input = document.getElementById("unicodeInput").value;
    const style = document.getElementById("styleSelect").value;

    if (!dataList || dataList.length === 0) {
        alert("Mapping data තවම load වෙලා නැහැ.");
        return;
    }

    let output = input;

    // Python code එකේ වගේම replace logic එක
    dataList.forEach(item => {
        if (item.uni && item[style] !== undefined) {
            output = output.split(item.uni).join(item[style]);
        }
    });

    document.getElementById("outputText").value = output;
}

function copyOutput() {
    const output = document.getElementById("outputText");

    if (output.value.trim() === "") {
        alert("Copy කරන්න output එකක් නැහැ.");
        return;
    }

    output.select();
    document.execCommand("copy");
    alert("Copied!");
}

function clearText() {
    document.getElementById("unicodeInput").value = "";
    document.getElementById("outputText").value = "";
}

// Auto convert
document.getElementById("unicodeInput").addEventListener("input", () => {
    if (dataList.length > 0) {
        convertText();
    }
});

document.getElementById("styleSelect").addEventListener("change", () => {
    if (dataList.length > 0) {
        convertText();
    }
});