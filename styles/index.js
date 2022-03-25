document.getElementById("Render").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("Render").innerHTML =
        this.responseText;
    }
};
xhttp.open("GET","home", true);
xhttp.send();
function func1(){
document.getElementById("Render").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Render").innerHTML =
            this.responseText;
        }
    };
    xhttp.open("GET","home", true);
    xhttp.send();
}
function func2(){
    document.getElementById("Render").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Render").innerHTML =
            this.responseText;
        }
    };
    xhttp.open("GET","inventors", true);
    xhttp.send();
}
function func3(){
    document.getElementById("Render").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Render").innerHTML =
            this.responseText;
        }
    };
    xhttp.open("GET","collection", true);
    xhttp.send();
}
const Search = () =>{
    const name = document.getElementById('SearchBar').value;
    if(!name.trim()){
        alert('Please enter something');
    }else{
        document.getElementById("SearchResult").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("SearchResult").innerHTML =
                this.responseText;
            }
        };
        xhttp.open("GET",`authorrecommendations/?name=${name}`, true);
        xhttp.send();
    }
}
const check = (event) =>{
    if(event.key === 'Enter'){
        Search();
    }return;
}
const Search1 = () =>{
    const name = document.getElementById('SearchBook').value;
    if(!name.trim()){
        alert('Please enter something');
    }else{
        document.getElementById("ShowCase").innerHTML ='<div style="height:60vh;display:flex;justify-content:center;align-items:center"><div class="spinner-border text-warning"></div></div>';
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("ShowCase").innerHTML =
                this.responseText;
            }
        };
        xhttp.open("GET",`booksrec/?name=${name}`, true);
        xhttp.send();
    }
}
const check1 = (event) =>{
    if(event.key === 'Enter'){
        Search1();
    }return;
}