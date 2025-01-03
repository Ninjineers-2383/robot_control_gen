package com.robotcontrol.lib.builder;

public class CommandParameter {
  protected enum Type {
    STRING,
    NUMBER,
    CONDITION,
    COMMAND
  }

  protected final String value_str;
  protected final double value_double;
  protected final Type type;

  protected CommandParameter(String string, double number, Type type) {
    value_str = string;
    value_double = number;
    this.type = type;
  }

  public static CommandParameter fromString(String value) {
    return new CommandParameter(value, 0, Type.STRING);
  }

  public static CommandParameter fromNumber(String value) {
    return new CommandParameter(null, Double.parseDouble(value), Type.NUMBER);
  }

  public String getString() {
    if (type != Type.STRING) {
      throw new IllegalStateException("Parameter is not a string");
    }
    return value_str;
  }

  public double getNumber() {
    if (type != Type.NUMBER) {
      throw new IllegalStateException("Parameter is not a number");
    }
    return value_double;
  }

  public boolean isString() {
    return type == Type.STRING;
  }

  public boolean isNumber() {
    return type == Type.NUMBER;
  }
}
