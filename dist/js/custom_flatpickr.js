// DIV COM TODOS OS EVENTOS
var eventoSesiDiv = $("#eventosSesi");

// STRING DE DATAS, ONDE GRAVA TODAS AS DATAS PARA COLOCAR NO CALENDÁRIO
var datas = [];

// PEGA O ÚLTIMO DIA DO PRÓXIMO MÊS - PARA A ÚLTIMA DATA DO CALENDÁRIO
function getLastDayOfNextMonth() {
    var d = new Date();
    d.setMonth(d.getMonth() + 1, 1);
    var lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return lastDayOfMonth;
}

// FUNÇÃO PARA ADICIONAR AS DATAS NO ARRAY QUE VAI PARA O CALENDÁRIO
function addData(data, titulo, subtitulo) {

    // DATAS
    // TODAS AS DATAS PRECISAM SER DO TIPO "YYYY-MM-DD"
    /// SE TEM ":", GERALMENTE O QUE VEM DA API TEM :
    /// TRANSFORMA EX. "20/12/2022 13:44:27" PARA "2022-12-20"
    if (data.indexOf(":") !== -1) {
        var dataArr = data.split(" ");
        var dataArr2 = dataArr[0].split("/");
        data = dataArr2[2] + "-" + dataArr2[1] + "-" + dataArr2[0];
        datas.push(data);
        /// SE TEM "-"
        /// TRANSFORMA EX. "20-12-2022" PARA "2022-12-20", CASO NECESSÁRIO
    }
    else if (data.indexOf("-") !== -1) {
        var dataSplit = data.split("-");
        if (dataSplit[0].length !== 4)
            data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
        datas.push(data);
        /// SE TEM "/"
        /// TRANSFORMA EX. "20/12/2022" PARA "2022-12-20"
    }
    else if (data.indexOf("/") !== -1) {
        var dataArr = data.split("/");
        data = dataArr[2] + "-" + dataArr[1] + "-" + dataArr[0];
        datas.push(data);
        /// SE SÓ TEM NÚMERO - É UM UNIX TIMESTAMP
        /// TRANSFORMA EX. "1671569063" PARA "2022-12-20"
    }
    else if (data.match(/^-?\d+$/)) {
        var dataCerta = new Date(parseInt(data, 10) * 1000);
        data = dataCerta.getFullYear() + "-" + ("0" + (dataCerta.getMonth() + 1)).slice(-2) + "-" + ("0" + dataCerta.getDate()).slice(-2);
        datas.push(data);
    }
    else {
        console.error("Formato de data inválido!");
    }

    // HTML DO EVENTO
    var htmlElement = "<div class=\"evento\"><h4>".concat(titulo, "</h4><p>").concat(subtitulo, "</p></div>");

    // JUNTA O HTML DO EVENTO COM O HTML DO DIA, CASO EXISTA
    // CASO O HTML DO DIA NÃO EXISTA, CRIA UMA DIV COM A DATA
    if (eventoSesiDiv.find("." + data).length === 0) {
        eventoSesiDiv.append("<div class=".concat(data, ">").concat(htmlElement, "</div>"));
    }
    else {
        eventoSesiDiv.find("." + data).append(htmlElement);
    }

    // ESCONDE A DIV DO EVENTO, NÃO PRECISA DELA AGORA, SÓ QUANDO CLICAR
    eventoSesiDiv.find("." + data).hide();
}

// CRIA O CALENDÁRIO
function criarCalendario() {
    $("#flatpicker-calendario").flatpickr({
        inline: true,
        locale: "pt",
        minDate: "today",
        maxDate: getLastDayOfNextMonth(),
        enable: datas,

        // ONCHANGE É O EVENTO DE QUANDO CLICA EM ALGUMA DATA NO CALENDÁRIO
        // MOSTRA A DIV "MÃE" E ESCONDE TODOS AS DIVS COM EVENTOS VISÍVEIS
        // DEPOIS MOSTRA SÓ OS EVENTOS COM A DATA CLICADA
        onChange: function (dateObj, dateStr) {
            if (eventoSesiDiv.is(":hidden"))
                eventoSesiDiv.show();
            $("#eventosSesi > div:visible").hide();
            eventoSesiDiv.find("." + dateStr).show();
        },

        // ONDAYCREATE É UM EVENTO QUE QUANDO ESTÁ CRIANDO AS DATAS (QUE EXISTEM), ELE FAZ ALGO
        // NESSE CASO, ADICIONA UMA CLASSE EM TODOS AS DATAS QUE TEM ALGO E ADICIONA A CLASSE EVENTO
        // PARA ADICIONAR A BOLINHA EM BAIXO DO EVENTO COM ALGO
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            if (!$(dayElem).hasClass("flatpickr-disabled"))
                dayElem.innerHTML += "<span class='event'></span>";
        }
    });
}