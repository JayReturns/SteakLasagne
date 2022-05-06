package com.github.jayreturns.slserver.shared.api;

import java.util.concurrent.atomic.AtomicInteger;

import static java.lang.Float.floatToIntBits;
import static java.lang.Float.intBitsToFloat;

/**
 * <a href="https://stackoverflow.com/questions/5505460/java-is-there-no-atomicfloat-or-atomicdouble">https://stackoverflow.com/questions/5505460/java-is-there-no-atomicfloat-or-atomicdouble</a>
 */
public class AtomicFloat extends Number {

    private AtomicInteger bits;

    public AtomicFloat() {
        this(0f);
    }

    public AtomicFloat(float initialValue) {
        bits = new AtomicInteger(floatToIntBits(initialValue));
    }

    public final boolean compareAndSet(float expect, float update) {
        return bits.compareAndSet(floatToIntBits(expect),
                floatToIntBits(update));
    }

    public final void set(float newValue) {
        bits.set(floatToIntBits(newValue));
    }

    public final float get() {
        return intBitsToFloat(bits.get());
    }

    public float floatValue() {
        return get();
    }

    public final float getAndSet(float newValue) {
        return intBitsToFloat(bits.getAndSet(floatToIntBits(newValue)));
    }

    public double doubleValue() {
        return floatValue();
    }

    public int intValue() {
        return (int) get();
    }

    public long longValue() {
        return (long) get();
    }


}
