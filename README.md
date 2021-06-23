# SpringChattingDemo

- Spring, Stomp 사용
- 1:N 채팅방 구현 


---- 

## 구조 분석

### @Controller
```
  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }
```
- @MessageMapping("/hello")
  - 해당 url로 들어온 Message를 매핑 
  - json데이터를 적절하게 인자로 받아서 처리한다. 보통 이를 처리할 객체를 Class로 생성한 뒤
  - 내부적으로 다시 출력용 클래스로 가공해서 처리해준다. 
  - 만약 DB 작업을 하려고 한다면 여기에서 DB에 써주는 처리도 해주는 것이 바람직할 것으로 보여진다. 

- @SendTo("/topic/greetings")
  - 보내는 곳에 대한 url을 적어주고 보내는 작업.
  - return으로 만들어진 객체를 여기로 쏴준다고 이해하면 된다. 
 
### SockJS 설정
```
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
```
- 중요한 부분은 2군데입니다.
- var socket = new SockJS('/gs-guide-websocket'); 
  - 소켓을 생성해주는 부분.
  - 후술할 WebSocketConfig.java 함수와 1:1로 매칭된다고 이해하면 됩니다. 

- stompClient.subscribe('/topic/greetings2', function (greeting) {
  -  @SendTo("/topic/greetings")랑 매칭 되는 부분. 

