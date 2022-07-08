jQuery.support.cors = true;

//Enter na caixa de pesquisa - index.html/help.html
$(document).ready(function () {
    $('#pesquisa').keypress(function (e) {
        if (e.keyCode == 13)
            $('#ibm').click();
    });
    $('#email').keypress(function (e) {
        if (e.keyCode == 13)
            $('#btmhelp').click();
    });
});

//Pesquisa de API's, imagens e informação - index.html.
function cosmia() {
    var caranome
    var rf = document.getElementById("radiofilme")
    var rd = document.getElementById("radiodiretor")
    var ra = document.getElementById("radioator")
    var radio = ""
    var d1 = ""
    var d2 = ""
    var d3 = ""
    var d4 = ""
    var d5 = ""
    var d6 = ""
    var d7 = ""
    var d8 = ""
    var d9 = ""
    var atores = ""
    var diretores = ""
    var genero = ""
    nome.innerHTML = ""
    obra.innerHTML = ""
    d1 = document.getElementById("d1");
    d2 = document.getElementById("d2");
    d3 = document.getElementById("d3");
    d4 = document.getElementById("d4");
    d5 = document.getElementById("d5");
    d6 = document.getElementById("d6");
    d7 = document.getElementById("d7");
    d8 = document.getElementById("d8");
    d9 = document.getElementById("d9");
    var pesquisa = document.getElementById("pesquisa");
    var pesquisa_v = pesquisa.value;
    var id_value; var filmenome;
    $("#tudofilme").addClass("d-none")
    $("#tudodiretor").addClass("d-none")
    $("#poster").addClass("d-none")
    $("#tudoerro").removeClass("d-none")
    if (rf.checked == true) { radio = "Titles" }
    if (rd.checked == true) { radio = "Directors" }
    if (ra.checked == true) { radio = "Actors" }
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/${radio}?name=${pesquisa_v}`,
        type: 'GET',
        crossDomain: true,
        async: false,
    }).done(function (msg) { id_value = msg[0].Id })
    $.ajax({
        url: `http://192.168.160.58/netflix/api/${radio}/${id_value}`,
        type: 'GET',
        crossDomain: true,
        async: false,
    }).done(function (msg) {
        if (rf.checked == true) {
            $("#tudoerro").addClass("d-none")
            d7.innerHTML = ""
            d8.innerHTML = ""
            d9.innerHTML = ""
            atores = msg.Actors;
            if (atores != "") {
                d7.innerHTML += "Atores: "
                atores.forEach(element => {
                    d7.innerHTML += element.Name
                    var last = (atores[(atores.length) - 1])
                    var last3 = last.Name
                    var last2 = element.Name
                    if (last3 != last2) {
                        d7.innerHTML += ", "
                    }
                })
                d7.innerHTML += "."
            };

            diretores = msg.Directors
            if (diretores != "") {
                d8.innerHTML += "Diretores: "
                diretores.forEach(element => {
                    d8.innerHTML += element.Name
                    var last = (diretores[(diretores.length) - 1])
                    var last3 = last.Name
                    var last2 = element.Name
                    if (last3 != last2) {
                        d8.innerHTML += ", "

                    }
                })
                d8.innerHTML += "."
            }


            genero = msg.Categories
            d9.innerHTML += "Categorias: "
            genero.forEach(element => {
                d9.innerHTML += element.Name
                var last = (genero[(genero.length) - 1])
                var last3 = last.Name
                var last2 = element.Name
                if (last3 != last2) {
                    d9.innerHTML += ", "

                }
            });
            filmenome = msg.Name
            d9.innerHTML += "."
            d1.innerHTML = (msg.Name)
            d2.innerHTML = ("Descrição: " + msg.Description)
            d3.innerHTML = ("Duração: " + msg.Duration)
            d4.innerHTML = ("Ano do Lançamento: " + msg.ReleaseYear)
            d5.innerHTML = ("Nota: " + msg.Rating.Id)
            d6.innerHTML = ("Tipo: " + msg.Type.Name)
            $("#tudofilme").removeClass("d-none")
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=92f029772ce90437c0b15ee1c2488cf3&query=" + filmenome + "&callback=?", function (json) {
                if ((json != "Nothing found.") && (json.results[0].title == filmenome)) {
                    $('#poster').html('</p><img style="display:block; margin: 0 auto; widht:auto; height:auto;  max-width:300px;" Alt="Imagem não disponível." src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
                    $("#poster").removeClass("d-none")
                }
            });
        }
        if ((rd.checked == true) || (ra.checked == true)) {
            $("#tudoerro").addClass("d-none")
            obra.innerHTML = ""
            genero = msg.Titles
            obra.innerHTML += "Obras: "
            genero.forEach(element => {
                obra.innerHTML += element.Name + " - " + element.ReleaseYear + "<br>"
            });
            if (rd.checked == true) { $("#tudodiretor").removeClass("d-none") }
            if (ra.checked == true) { $("#tudodiretor").removeClass("d-none") }
            caranome = msg.Name
            nome.innerHTML = msg.Name
            $.getJSON("https://api.themoviedb.org/3/search/person?api_key=92f029772ce90437c0b15ee1c2488cf3&query=" + caranome + "&callback=?", function (json) {
                console.log(json);
                if (json != "Nothing found.") {
                    $('#poster').html('</p><img style="display:block; margin: 0 auto; widht:auto; height:auto;  max-width:300px;" alt=" Imagem não disponível." src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].profile_path + '\" class=\"img-responsive\" >');
                    $("#poster").removeClass("d-none")
                }
            });
        }
    });
}

//Botões de gênero -  gen.html.
function show(event) {
    var genfilme
    var gentitle
    var gennum
    var frase
    frase = ""
    genfilme = ""
    gentitle = ""
    gennum = 0
    frase = document.getElementById("frase")
    genfilme = document.getElementById("genfilme")
    gentitle = document.getElementById("gentitle")
    gennum = document.getElementById("gennum")
    genfilme.innerHTML = ""
    $('#badge_group').html('')
    var id = 0;
    $("#semp").addClass("d-none")
    $("#comp").removeClass("d-none")
    switch (event) {
        case 'comedia':
            id = 3
            gentitle = "Comédia"
            break;
        case 'scifi':
            id = 11
            gentitle = "Sci-fi"
            break;
        case 'acao':
            id = 1
            gentitle = "Ação e Aventura"
            break;
        case 'documentario':
            id = 13
            gentitle = "Documentário"
            break;
        case 'drama':
            id = 4
            gentitle = "Drama"
            break;
        case 'terror':
            id = 9
            gentitle = "Terror"
            break;
        case 'romance':
            id = 12
            gentitle = "Romance"
            break;
        case 'anime':
            id = 20
            gentitle = "Anime"
            break;
        case 'kids':
            id = 21
            gentitle = "Kids"
            break;
        case 'suspense':
            id = 10
            gentitle = "Suspense"
            break;
    }
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Categories/${id}`,
        type: 'GET',
        crossDomain: true,
        async: false,
    }).done(function (msg) {
        var rep = 0
        var i
        var lst = []
        while (rep < 20) {
            i = Math.floor((Math.random() * 100) + 1);
            if (lst.indexOf(i) == -1) {
                genfilme.innerHTML += msg.Titles[i].Name + "<br>"
                lst.push(i)
                rep += 1
            }
        }
            
        var titporgen = msg.Titles
        titporgen.forEach(element => {
                gennum += 1
        })
    })
    frase.innerHTML = "Aqui estão 20 dos nossos " + gennum + " títulos de " + gentitle + "."

}

//Informação da DataBase - gen.html
$.ajax({
    url: `http://192.168.160.58/netflix/api/Statistics`,
    type: 'GET',
    crossDomain: true,
    async: false,

}).done(function (msg) {
    $('#card_1').html(msg.Titles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    $('#card_2').html(msg.Actors.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    $('#card_3').html(msg.Directors.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    $('#card_4').html(msg.Countries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
})

//Curiosidade cinematográfica - gen.html
function curi() {
    var curiosidade = document.getElementById("curiosidade")
    var x = Math.floor((Math.random() * 10) + 1);
    switch (x = Math.floor((Math.random() * 10) + 1)) {
        case x = 1:
            curiosidade.innerHTML = "Sabia que Tom Selleck era o actor originalmente pensado para fazer o papel de Indiana Jones?"
            break;

        case x = 2:
            curiosidade.innerHTML = "Sabia que Jack Nicholson é o actor com mais oscares vencidos..três no total pelas as suas prestagues em Melhor é Impossivel, Voando Sobre um Ninho de Cucos e Lagos de Ternura?"
            break;

        case x = 3:
            curiosidade.innerHTML = "The Coco Bongo Club é o nome de um famoso clube em A Máscara protagonizado por Jim Carreye é também o nome de outro clube musical noutro filme de Carrey: The Majestic"
            break;

        case x = 4:
            curiosidade.innerHTML = "Sabia que a meio da primeira sessão do filme françês Irreversível já metade dos espectadores tinha abandonado a sala?... Desconfiamos que na última sessão também..."
            break;

        case x = 5:
            curiosidade.innerHTML = "No filme A Paixão de Cristo, na cena em que Maria Madalena toca nos pés de Jesus, na realidade são os pés do realizador Mel Gibsond."
            break;

        case x = 6:
            curiosidade.innerHTML = "Sabia que o título do filme japonês Tora, Tora, Tora! traduzido significa Matar, Matar, Matar!?"
            break;

        case x = 7:
            curiosidade.innerHTML = "Sabia que para manter o suspense quanto à identidade do assassino, Kevin Spacey sujeitou-se a não aparecer na intro em Se7en?"
            break;

        case x = 8:
            curiosidade.innerHTML = "Sabia que Titanic é o filme que mais lucro deu fora e dentro dos E.U.A.?"
            break;

        case x = 9:
            curiosidade.innerHTML = "Sabia que o nome Indiana Jones foi inspirado no nome do cão de George Lucas?"
            break;

        case x = 10:
            curiosidade.innerHTML = "Em Harry Potter e o Prisioneiro de Azkaban o ilusionista Paul Kieve trabalhou como consultor no filme, tendo ensinado ao elenco pequenos truques mágicos."
            break;
    };
};

//Enviar e-mail sem ir para Formspree - help.html
$("#contato").submit(function (e) {
    var email = $("#email").val()
    var textArea = $("#textArea").val()
    e.preventDefault();
    $("#email").val()
    $("#textArea").val()
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            message: textArea
        },
        success: function (data) {
            $("#alert").removeClass('d-none')
            alert("Email enviado com sucesso, nossa equipa entrará em contato");
        }
    });

});