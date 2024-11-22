//variables
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");

var bookMarkList = [];

if (localStorage.getItem("bookMarkContainer") !== null) {
    bookMarkList = JSON.parse(localStorage.getItem("bookMarkContainer"));
    displayData();
}

//add
function addbookMark() {

    var nameValue = siteNameInput.value.trim();
    var urlValue = siteUrlInput.value.trim();


    var isNameValid = validationName();
    var isUrlValid = validationURL();

    if (isNameValid && isUrlValid) {
        var bookMark = {
            name: nameValue,
            url: urlValue
        };

        bookMarkList.push(bookMark);
        localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
        displayData();
        clearForm();
        hideModel();
    } 
    
    else {
        openModel();
    }
}


//clear
function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

//display
function displayData() {
    var cartona = "";

    for (var i = 0; i < bookMarkList.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookMarkList[i].name}</td>
                <td>
                    <button class="visit">
                        <a href="${bookMarkList[i].url}" target="_blank" class="visit"> 
                            <i class="fa-solid fa-eye pe-2"></i> 
                            Visit 
                        </a>
                    </button>
                </td>
                <td>
                    <button onclick="deleteItem(${i})" class="delete">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }


    document.getElementById("bodyData").innerHTML = cartona;
}


//delete
function deleteItem(index) {
    bookMarkList.splice(index, 1);
    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
    displayData();
}


//validation
var invalidInputs = document.getElementById("out-inner-box");

function validationName() {
    var nameRegex = /^\w{3,}(\s+\w+)*$/;
    var Ntext = siteNameInput.value.trim();

    if (nameRegex.test(Ntext)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false;
    }
}

function validationURL() {
    var urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}(:\d{2,5})?(\/\w+)*$/;
    var URLtext = siteUrlInput.value.trim();

    if (urlRegex.test(URLtext)) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;
    } else {
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        return false;
    }
}

var btn = document.getElementById("submit");
btn.addEventListener("click", addbookMark);

function openModel() {
    invalidInputs.classList.remove("d-none");
}

function hideModel() {
    invalidInputs.classList.add("d-none");
}

document.getElementById("closeBtn").addEventListener("click", function() {
    hideModel();
    clearForm();
});


siteNameInput.addEventListener("input", validationName);
siteUrlInput.addEventListener("input", validationURL);
