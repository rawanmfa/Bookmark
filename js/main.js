var SiteNameInput = document.getElementById("SiteName");
var SiteURLInput = document.getElementById("SiteURL");
var BookmarkList=[];

if (localStorage.getItem("BookmarkList")==null) {
    BookmarkList=[];
}else{
    BookmarkList=JSON.parse(localStorage.getItem("BookmarkList"));
    display();
}

function submit() {
    if (validate(SiteNameInput)&&validate(SiteURLInput)) {
        var Bookmark={
            Name : SiteNameInput.value,
            url : SiteURLInput.value
        }
        BookmarkList.push(Bookmark);
        clearForm();
        display();
        SiteNameInput.classList.remove("is-valid");
        SiteURLInput.classList.remove("is-valid");
        localStorage.setItem("BookmarkList",JSON.stringify(BookmarkList))
    }
    else{
        document.getElementById('boxAleart').classList.remove("d-none")
    }
}
function clearForm() {
    SiteNameInput.value=null;
    SiteURLInput.value=null;
}
function display() {
    var cartona=``;
    for (var i = 0; i < BookmarkList.length; i++) {
        cartona+=`
                  <tr>
                    <td>${i+1}</td>
                    <td>${BookmarkList[i].Name}</td>
                    <td><a href="${BookmarkList[i].url}"><button class="btn btn-warning"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                    <td><button onclick="deletebookmark(${i});" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                  </tr>
                  `
    }
    document.getElementById("tableContent").innerHTML = cartona;
}
function deletebookmark(deletedItem) {
    BookmarkList.splice(deletedItem,1)
    display();
    localStorage.setItem("BookmarkList",JSON.stringify(BookmarkList))
}
function validate(ele) {
    var regex = {
        SiteName: /^[A-Za-z_]{1,}$/,
        SiteURL: /^(https:\/\/)?(http:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}\/$/
    };
    
    if (regex[ele.id].test(ele.value)) {
        // console.log('match');
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        return true;
    } else {
        // console.log('no match');
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        return false;
    }
}
function closs() {
    document.getElementById('boxAleart').classList.add('d-none')
}