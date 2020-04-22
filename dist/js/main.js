function changeDiv(target){
    if(target == "mapa"){
        var element = document.getElementById("trafego");
        element.classList.remove("active");

        document.getElementById("trafficArea").style.display = "none"
        document.getElementById("mapArea").style.display = ""

        var element = document.getElementById(target);
        element.classList.add("active");
        
    }else{
        var element = document.getElementById("mapa");
        element.classList.remove("active");

        document.getElementById("mapArea").style.display = "none"
        document.getElementById("trafficArea").style.display = ""

        var element = document.getElementById(target);
        element.classList.add("active");
    }
}