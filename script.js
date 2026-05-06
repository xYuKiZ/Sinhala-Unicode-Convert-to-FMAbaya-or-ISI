let dataList = [];
const unicodeInput = document.getElementById("unicodeInput");
const outputText = document.getElementById("outputText");
const styleSelect = document.getElementById("styleSelect");
const charCount = document.getElementById("charCount");
const toast = document.getElementById("toast");

// Show toast notification
function showToast(message, type = "success") {
    toast.textContent = message;
    toast.style.background = type === "success" ? "#10b981" : "#ef4444";
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

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
        // Initial conversion if there's text
        if (unicodeInput.value) convertText();
    })
    .catch(error => {
        showToast("Error loading mapping data. Please check data_list.json", "error");
        console.error(error);
    });

function convertText() {
    const input = unicodeInput.value;
    const style = styleSelect.value;

    if (!dataList || dataList.length === 0) {
        return;
    }

    let output = input;

    // character count update
    charCount.textContent = `${input.length} character${input.length !== 1 ? 's' : ''}`;

    // replace logic
    dataList.forEach(item => {
        if (item.uni && item[style] !== undefined) {
            output = output.split(item.uni).join(item[style]);
        }
    });

    outputText.value = output;
}

function copyOutput() {
    if (outputText.value.trim() === "") {
        showToast("No text to copy!", "error");
        return;
    }

    navigator.clipboard.writeText(outputText.value).then(() => {
        showToast("Copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        outputText.select();
        document.execCommand("copy");
        showToast("Copied to clipboard!");
    });
}

function clearText() {
    unicodeInput.value = "";
    outputText.value = "";
    charCount.textContent = "0 characters";
    unicodeInput.focus();
    showToast("Cleared!");
}

// Event Listeners
unicodeInput.addEventListener("input", () => {
    convertText();
});

styleSelect.addEventListener("change", () => {
    convertText();
});
