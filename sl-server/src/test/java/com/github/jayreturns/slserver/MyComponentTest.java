package com.github.jayreturns.slserver;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class MyComponentTest {

    @InjectMocks
    private MyComponent myComponent;

    @Test
    void upper() {
        assertEquals("HALLO", myComponent.upper("Hallo"));
    }
}