(function () {
    //Variables
    var state = document.getElementById("s-state");
    var resultInput = document.getElementById("resultinput");

    //Events Loaded
    document.addEventListener("DOMContentLoaded", DisabledBtn);
    document.addEventListener("DOMContentLoaded", CheckCookie);
    const timer = setInterval(offTimer,1000);


    //In Disable Btn
    function DisabledBtn() {
        var lastBtn = document.getElementById("lastbtn");
        document.getElementById("form1").addEventListener("submit", setTotal);

        lastBtn.disabled = true;
        state.addEventListener("change", function () {
            if (state.value === "") {
                lastBtn.disabled = true;
            } else {
                lastBtn.disabled = false;
            }
        })
    }

    //This function called on submit the form
    function setTotal(e) {

        //For alerting to required fields

        function alert(message, color) {
            var alertPlaceholder = document.getElementById('selectDiv');
            var wrapper = document.createElement('div')
            wrapper.innerHTML = '<div class="w-75 alert alert-dismissible myAlert" style="background-color : ' + color + '"' + 'role="alert">' + message + '<button type="button" class="btn-close myAlertbtn" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            alertPlaceholder.append(wrapper);
        }
        if (state.value === "") {
            alert('Please fill the select box!', '#bb2dfd');
            state.focus();
        }

        //For calculate total
        var shoes = document.getElementById("shoesCard").value,
            streetSets = document.getElementById("streetSetsCard").value,
            menswear = document.getElementById("menswearCard").value,
            stateV = state.value,
            shippingAndHeading = document.querySelector("input[name = r-method]:checked").value,
            shippingAndHeadingMony = 0;


        switch (shippingAndHeading) {
            case "usps": {
                shippingAndHeadingMony = 2;
                break;
            }
            case "ups": {
                shippingAndHeadingMony = 3;
                break;
            }
            default: {
                shippingAndHeadingMony = 0;
                break;
            }
        }

        var total = "$" + parseFloat(parseFloat(shoes * 208.5) + parseFloat(streetSets * 796.5) + parseFloat(menswear * 389.6) + shippingAndHeadingMony).toFixed(2);
        resultInput.value = total;
        console.log(total);
        e.preventDefault();
    }


    //Set cookie
    function SetCookie(name, value, exday) {
        var d = new Date();
        d.setTime(d.getTime() + (exday * 24 * 60 * 60 * 1000));
        var expires = "expires" + d.toGMTString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        var name = name + "=";
        var decodeCookie = decodeURIComponent(document.cookie);
        var cook = decodeCookie.split(";");
        for (var i = 0; i < cook.length; i++) {
            var c = cook[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    function CheckCookie() {
        var user = getCookie("username");
        if (user != "") {
            alert("Thanks for yor buy dear " + user);
        } else {
            user = prompt("Please enter your name", "");
            if (user != "" && user != null) {
                SetCookie("username", user, 3);
            }
        }
    }

    function offTimer() {
        var targetTime = new Date("2022-12-25 23:59:59").getTime(),
            currentTime = new Date().getTime(),
            minesTime = targetTime - currentTime;

        if (minesTime <= 0){
            clearInterval(timer);
        }


        let tl = giveInfo();
        for (pro in tl){
            el = document.querySelector("." + pro);
            if(el){
                el.innerHTML = tl[pro];
            }else{
                console.log("Cant Find");
            }
        }


        function giveInfo() {
            var days = Math.floor(minesTime / (1000 * 60 * 60 * 24)),
                hours = Math.floor((minesTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((minesTime % (1000 * 60 * 60)) / (1000 * 60)),
                seconde = Math.floor((minesTime % (1000 * 60)) / (1000))
            return {
                days : days,
                hours : hours,
                minutes : minutes,
                seconde : seconde,
            };
        }
    }

})();
