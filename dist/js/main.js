function changeDiv(target){
    if(target == "map"){
        var element = document.getElementById("traffic");
        element.classList.remove("active");

        document.getElementById("trafficArea").style.display = "none"
        document.getElementById("mapArea").style.display = ""

        var element = document.getElementById(target);
        element.classList.add("active");
        
    }else{
        var element = document.getElementById("map");
        element.classList.remove("active");

        document.getElementById("mapArea").style.display = "none"
        document.getElementById("trafficArea").style.display = ""

        var element = document.getElementById(target);
        element.classList.add("active");
    }
}