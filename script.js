$(document).ready(init);


function clearCard() {

  $(".card").remove();
}

function getCard() {

  clearCard();

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

function deleteCard() {

  var me = $(this);
  var id = me.siblings(".card-id").text();

  $.ajax({
    url: "http://157.230.17.132:3021/todos/" + id,
    method: "DELETE",
    success: function(apiData, stato) {

      if (stato == "success") {

        getCard();
      }
    },
    error: function(richesta, stato, errori) {
      alert("Problemi di connessione");
    },
  });
}

function clearInput() {

  $("input").val("");
}

function pressEnter(e) {

  if (e.which == 13) {
    newCard();
  }
}

function newCard() {

  var input = $("input").val();

  $.ajax({
    url: "http://157.230.17.132:3021/todos/",
    method: "POST",
    data: {text: input},
    success: function(apiData, stato) {

      if (stato == "success") {

        getCard();
      }
    },
    error: function(richiesta, stato, errori) {
      alert("Errore di connessione");
    }
  });

  clearInput(); //FINE: ELIMINO VALORE DELL'INPUT
}

function init() {

  getCard();
  $(document).on("click", ".card > ul > span", deleteCard);

  var input = $("input");
      input.keyup(pressEnter);

  var button = $("button");
      button.click(newCard);
}
