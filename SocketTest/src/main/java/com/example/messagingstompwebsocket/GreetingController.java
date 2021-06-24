package com.example.messagingstompwebsocket;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }

  @MessageMapping("/hello2")
  @SendTo("/topic/greetings2")
  public Greeting greeting2(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }
  
  @MessageMapping("/chat")
  @SendTo("/topic/chat")
  public Chat chat(Chat chat) throws Exception {
	  Date date = new Date(System.currentTimeMillis()); 
	  SimpleDateFormat format = new SimpleDateFormat("HH:mm"); 
	  String now_time = format.format(date); 
	  return new Chat(chat.getName(), chat.getMessage()+"---"+now_time );
  }
}