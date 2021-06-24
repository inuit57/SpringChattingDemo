var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
        
        stompClient.subscribe('/topic/greetings2', function (greeting) {
            showGreeting2(JSON.parse(greeting.body).content);
        });
        
        stompClient.subscribe('/topic/chat', function (chat) {
    		showChat(JSON.parse(chat.body));
    	});
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function sendName2() {
    stompClient.send("/app/hello2", {}, JSON.stringify({'name': $("#chatMessage").val()}));
}

function sendChat() {
	stompClient.send("/app/chat", {}, JSON.stringify({'name': $("#name").val(), 'message': $("#chatMessage").val()})); 
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

function showGreeting2(message) {
    $("#greetings").append("<tr><td>" +"test :"+ message + "</td></tr>");
}

function showChat(chat) {
  if( $("#name").val() == chat.name){
  	$("#greetings").append("<tr><td align='right'>" + chat.name + " :: " + chat.message + "</td></tr>");
  }else{
  	$("#greetings").append("<tr><td align='left'>" + chat.name + " :: " + chat.message + "</td></tr>");
  }
  $("#chatMessage").val('')  ;
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#send2" ).click(function() { sendName2(); });
    $( "#chatSend" ).click(function(){ sendChat(); }); 
});