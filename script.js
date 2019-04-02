$(document).ready(init);

function getCard() {

  $.ajax({
    url: "http://157.230.17.132:3021/todos",
    method: "GET",
    success: function(apiData, stato) {

      if (stato == "success") {

        var container = $("main");
        var source = $("#card-template").html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < apiData.length; i++) {

          var result = apiData[i];
          var text = result.text;
          var id = result.id;

          var data = {
            id : id,
            text: text,
          }
          var fullHtml = template(data);
          container.append(fullHtml);
        }
      }
    },
    error: function(richiesta, stato, errori) {

      alert("Problemi di connessioni!")
    },
  });
}




function init() {

  getCard();
}
