let fileData = [];

document.getElementById("fileInput").addEventListener("change", function(event) {
    const files = event.target.files;
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    fileData = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const listItem = document.createElement("li");
        listItem.textContent = file.name;
        listItem.dataset.index = i;
        fileList.appendChild(listItem);
        fileData.push(file);
    }

    document.getElementById("fileCount").textContent = `${files.length} file`;
});

new Sortable(document.getElementById("fileList"), {
    animation: 150,
    ghostClass: 'sortable-ghost'
});

document.getElementById("mergeButton").addEventListener("click", async function() {
    if (fileData.length === 0) {
        alert("Pilih minimal 1 file TXT.");
        return;
    }

    const outputFileName = document.getElementById("outputFileName").value.trim();
    const finalFileName = outputFileName ? `${outputFileName}.txt` : "Gabungan.txt";

    let mergedContent = "";
    
    for (let item of document.querySelectorAll("#fileList li")) {
        let fileIndex = item.dataset.index;
        let file = fileData[fileIndex];
        let text = await file.text();
        mergedContent += text + "\n";
    }

    const blob = new Blob([mergedContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = finalFileName;
    link.click();
});

document.getElementById("resetButton").addEventListener("click", function() {
    document.getElementById("fileInput").value = "";
    document.getElementById("fileList").innerHTML = "";
    document.getElementById("fileCount").textContent = "0 file";
    document.getElementById("outputFileName").value = "";
    fileData = [];
});
