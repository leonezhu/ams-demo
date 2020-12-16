package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author XiaoXiong
 * @since 2020/12/16
 */
@Controller
public class HelloController {

    @GetMapping("index")
    public String hello() {
        return "/userTagScriptTest";
    }


}
