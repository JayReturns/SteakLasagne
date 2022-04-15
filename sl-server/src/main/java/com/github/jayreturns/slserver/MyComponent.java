package com.github.jayreturns.slserver;

import org.springframework.stereotype.Component;

@Component
public class MyComponent {

    public String upper(String in) {
        return in.toUpperCase();
    }

}
