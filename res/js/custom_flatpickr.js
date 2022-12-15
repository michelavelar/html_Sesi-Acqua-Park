var eventoSesiDiv = $("#eventosSesi");
var datas = [];
function getLastDayOfNextMonth() {
    var d = new Date();
    d.setMonth(d.getMonth() + 1, 1);
    var lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return lastDayOfMonth;
}
function addData(data, titulo, subtitulo) {
    // DATAS
    if (data.indexOf("-") !== -1) {
        var dataSplit = data.split("-");
        if (dataSplit[0].length !== 4)
            data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
        datas.push(data);
    }
    else if (data.indexOf("/") !== -1) {
        var dataArr = data.split("/");
        data = dataArr[2] + "-" + dataArr[1] + "-" + dataArr[0];
        datas.push(data);
    }
    else {
        console.error("Formato de data inválido!");
    }
    // ADICIONAR EVENTOS
    var htmlElement = "<div class=\"evento\"><h4>".concat(titulo, "</h4><p>").concat(subtitulo, "</p></div>");
    if (eventoSesiDiv.find("." + data).length === 0) {
        eventoSesiDiv.append("<div class=".concat(data, ">").concat(htmlElement, "</div>"));
    }
    else {
        eventoSesiDiv.find("." + data).append(htmlElement);
    }
    eventoSesiDiv.find("." + data).hide();
}
function criarCalendario() {
    $("#flatpicker-calendario").flatpickr({
        inline: true,
        locale: "pt",
        minDate: "today",
        maxDate: getLastDayOfNextMonth(),
        enable: datas,
        onChange: function (dateObj, dateStr) {
            if (eventoSesiDiv.is(":hidden"))
                eventoSesiDiv.show();
            $("#eventosSesi > div:visible").hide();
            eventoSesiDiv.find("." + dateStr).show();
        },
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            if (!$(dayElem).hasClass("flatpickr-disabled"))
                dayElem.innerHTML += "<span class='event'></span>";
        }
    });
}